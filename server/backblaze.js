const Promise = require('bluebird');
const backblaze = require('node-backblaze-b2');
const mime = require('mime-types');
const backblazeConfig = require('../config/backblazeConfig');
const { normalizeString } = require('./cloudantHelpers/IDGenerators');
const { FILE_METADATA_MODIFIER } = require('../shared/FormConstants');

const REAUTH_INTERVAL = 60 * 60 * 1000;  // one hour

const ARRANGEMENT_BUCKET = 'hangovers-arrangements';
const RECORDING_BUCKET = 'hangovers-recordings';
const PDF_BUCKET = 'hangovers-arrangement-pdfs';
let ARRANGEMENT_BUCKET_ID;
let RECORDING_BUCKET_ID;
let PDF_BUCKET_ID;
let bucketNameToIdMap = {};

/** Configure b2 - authenticate and grab ids for buckets */
const b2 = Promise.promisifyAll(new backblaze(backblazeConfig));
b2.authorizeAsync()
  .then(() => b2.listBucketsAsync())
  .then(({ buckets }) => {
    ARRANGEMENT_BUCKET_ID = buckets.find(({ bucketName }) => bucketName === ARRANGEMENT_BUCKET).bucketId;
    RECORDING_BUCKET_ID = buckets.find(({ bucketName }) => bucketName === RECORDING_BUCKET).bucketId;
    PDF_BUCKET_ID = buckets.find(({ bucketName }) => bucketName === PDF_BUCKET).bucketId;
    bucketNameToIdMap[ARRANGEMENT_BUCKET] = ARRANGEMENT_BUCKET_ID;
    bucketNameToIdMap[RECORDING_BUCKET] = RECORDING_BUCKET_ID;
    bucketNameToIdMap[PDF_BUCKET] = PDF_BUCKET_ID;
  })
  .then(() => console.log('authenticated to backblaze and configured bucket ids'))
  .catch(e => {
    console.error('unable to authenticate to backblze');
    console.error(e);
  });

/**
 * Every hour reauthenticat to backblaze
 * Note that this is a "temporary" workaround. Ideally, when we get a 401 auth
 * token expired, we should generate a new token as detailed here:
 * https://www.backblaze.com/b2/docs/integration_checklist.html
 * As this will probably involve either finding a new library or writing our own,
 * gonna hold out on that for the time being.
 */
const reauthenticate = () => setTimeout(() => {
  console.log('reauthenticating to backblaze');
  b2.authorizeAsync()
    .then(() => {
      console.log('successfully reauthenticated to backblaze');
      reauthenticate();
    })
    .catch(e => {
      console.error('unable to authenticate to backblze');
      console.error(e);
    });
}, REAUTH_INTERVAL);
reauthenticate();

/** Download a file */
const downloadFile = (fileName, bucketName, cb) => b2.getFileStream({
  fileName,
  bucketName,
}, cb);

/** Given the return from adaptFiles, upload all of them */
const uploadFiles = (adaptedFiles) => {
  const types = [{
    type: 'pdf',
    uploadMethod: uploadPDF
  }, {
    type: 'finale',
    uploadMethod: uploadArrangement
  }, {
    type: 'recording',
    uploadMethod: uploadRecording
  }];
  
  const proms = [];
  for (const { type, uploadMethod } of types) {
    if (adaptedFiles[type].length) {
      adaptedFiles[type].forEach((file) => {
        if (file.path) {
          proms.push(uploadMethod(file.name, file.path, file.mimetype));
        }
      })
    }
  }

  return Promise.all(proms);
}

/** Helper methods for different upload types */
const uploadArrangement = (name, path, mimetype) => _upload(name, path, mimetype, ARRANGEMENT_BUCKET_ID);
const uploadRecording = (name, path, mimetype) => _upload(name, path, mimetype, RECORDING_BUCKET_ID);
const uploadPDF = (name, path, mimetype) => _upload(name, path, mimetype, PDF_BUCKET_ID);
const _upload = (fileName, file, contentType, bucketId) => {
  console.log(`uploading ${fileName} in ${bucketId}`);
  return b2.uploadFileAsync({
    bucketId,
    fileName,
    file,
    contentType,
    retryAttempts: 3,
  });
};

/** Given the return from adaptFiles, delete all of them */
const deleteFiles = (deletedFiles) => Promise.all(
  deletedFiles.map(({ fileName, bucketName }) =>
    deleteFile(fileName, bucketName)
  )
);

/** Delete all versions of a file */
const deleteFile = (fileName, bucketName) => b2.listFileVersionsAsync({
  startFileName: fileName,
  bucketId: bucketNameToIdMap[bucketName],
  strict: true,
}).then(({ files }) => Promise.map(files, ({ fileId }) => {
  console.log(`deleting ${fileName} version ${fileId}`);
  return b2.deleteFileAsync({
    fileId,
    fileName,
  });
}));

const getFileName = (arrangementName, metadata, extension) => {
  const { version } = metadata;
  const name = normalizeString(arrangementName) + (version ? `_${normalizeString(version)}` : '');
  return `${name}.${extension}`;
}

/** Adapt a file into a friendly file */
const fileAdapt = (f, name, metadata, bucketName, dot) => ({
  ...metadata,
  name: getFileName(name, metadata, dot || mime.extension(f.mimetype)),
  mimetype: f.mimetype,
  path: f.path,
  bucketName,
});

/** Adapt a files object with pdf/mus/recording keys into friendly files */
const adaptFiles = (files, arrangement) => {
  const name = arrangement.name;

  const deletedFiles = [];
  const adaptedFiles = {};

  const fields = [{
    field: 'pdf',
    bucket: PDF_BUCKET
  }, {
    field: 'finale',
    bucket: ARRANGEMENT_BUCKET,
    dot: 'mus'
  }, {
    field: 'recording',
    bucket: RECORDING_BUCKET
  }];

  for (const { field, bucket, dot } of fields) {
    const metadataField = `${field}${FILE_METADATA_MODIFIER}`;

    // make sure field and metadataField are arrays;
    const arrangementFileField = [].concat(arrangement[field]).filter(file => file);
    const arrangementMetadata = [].concat(arrangement[metadataField]).filter(file => file).map(JSON.parse);

    adaptedFiles[field] = (files[field] || [])
      .map((file, i) => fileAdapt(file, name, arrangementMetadata[i], bucket, dot));

    if (arrangementFileField && arrangementFileField.length) {
      arrangementFileField.forEach((file) => {
        try {
          const fileMetadata = JSON.parse(arrangement[field]);
          if (fileMetadata.deleted) {
            deletedFiles.push(fileMetadata);
          } else {
            adaptedFiles[field].push(fileMetadata);
          }
        } catch (e) {}
      })
    }
  }

  return { adaptedFiles, deletedFiles };
};

module.exports = {
  adaptFiles,
  uploadFiles, uploadArrangement, uploadRecording, uploadPDF,
  downloadFile,
  deleteFiles, deleteFile,
};
