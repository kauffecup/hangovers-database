const Promise = require('bluebird');
const backblaze = require('node-backblaze-b2');
const mime = require('mime-types');
const backblazeConfig = require('../config/backblazeConfig');

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

const downloadFile = (fileName, bucketName, cb) => b2.getFileStream({
  fileName,
  bucketName,
}, cb);

/** Given the return from adaptFiles, upload all of them */
const uploadFiles = (adaptedFiles) => {
  const { pdf, finale, recording } = adaptedFiles;
  const proms = [];
  if (pdf && pdf.path) {
    proms.push(uploadPDF(pdf.name, pdf.path, pdf.mimetype));
  }
  if (finale && finale.path) {
    proms.push(uploadArrangement(finale.name, finale.path, finale.mimetype));
  }
  if (recording && recording.path) {
    proms.push(uploadRecording(recording.name, recording.path, recording.mimetype));
  }
  return Promise.all(proms);
}

/** Helper methods for different upload types */
const uploadArrangement = (name, path, mimetype) => _upload(name, path, mimetype, ARRANGEMENT_BUCKET_ID);
const uploadRecording = (name, path, mimetype) => _upload(name, path, mimetype, RECORDING_BUCKET_ID);
const uploadPDF = (name, path, mimetype) => _upload(name, path, mimetype, PDF_BUCKET_ID);
const _upload = (fileName, file, contentType, bucketId) => b2.uploadFileAsync({
  bucketId,
  fileName,
  file,
  contentType,
  retryAttempts: 3,
});

/** Given the return from adaptFiles, delete all of them */
const deleteFiles = (deletedFiles) => {
  const { pdf, finale, recording } = deletedFiles;
  const proms = [];
  if (pdf) {
    proms.push(deleteFile(pdf.fileName, pdf.bucketName));
  }
  if (finale) {
    proms.push(deleteFile(finale.fileName, finale.bucketName));
  }
  if (recording) {
    proms.push(deleteFile(recording.fileName, recording.bucketName));
  }
  return Promise.all(proms);
}

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

/** Adapt a file into a friendly file */
const adaptFile = (path, mimetype, arrangementName, bucketName, dot) => ({
  name: `${arrangementName.toLowerCase().replace(/\s/g, '_')}.${dot || mime.extension(mimetype)}`,
  mimetype,
  path,
  bucketName,
});
const fileAdapt = (f, name, bucket, dot) => adaptFile(f.path, f.mimetype, name, bucket, dot);

/** Adapt a files object with pdf/mus/recording keys into friendly files */
const adaptFiles = (files, arrangement) => {
  const name = arrangement.name;

  const deletedFiles = {};
  const adaptedFiles = {};

  if (files.pdf && files.pdf.length) {
    adaptedFiles.pdf = fileAdapt(files.pdf[0], name, PDF_BUCKET);
  } else if (arrangement.pdf) {
    try {
      const pdf = JSON.parse(arrangement.pdf);
      if (pdf.deleted) {
        deletedFiles.pdf = pdf;
      } else {
        adaptedFiles.pdf = pdf;
      }
    } catch(e) {}
  }

  if (files.finale && files.finale.length) {
    adaptedFiles.finale = fileAdapt(files.finale[0], name, ARRANGEMENT_BUCKET, 'mus');
  } else if (arrangement.finale) {
    try {
      const finale = JSON.parse(arrangement.finale);
      if (finale.deleted) {
        deletedFiles.finale = finale;
      } else {
        adaptedFiles.finale = finale;
      }
    } catch(e) {}
  }

  if (files.recording && files.recording.length) {
    adaptedFiles.recording = fileAdapt(files.recording[0], name, RECORDING_BUCKET);
  } else if (arrangement.recording) {
    try {
      const recording = JSON.parse(arrangement.recording);
      if (recording.deleted) {
        deletedFiles.recording = recording;
      } else {
        adaptedFiles.recording = recording;
      }
    } catch(e) {}
  }

  return { adaptedFiles, deletedFiles };
};

module.exports = {
  adaptFiles,
  uploadFiles, uploadArrangement, uploadRecording, uploadPDF,
  downloadFile,
  deleteFiles, deleteFile,
};
