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

const b2 = Promise.promisifyAll(new backblaze(backblazeConfig));
b2.authorizeAsync()
  .then(() => b2.listBucketsAsync())
  .then(({ buckets }) => {
    ARRANGEMENT_BUCKET_ID = buckets.find(({ bucketName }) => bucketName === ARRANGEMENT_BUCKET).bucketId;
    RECORDING_BUCKET_ID = buckets.find(({ bucketName }) => bucketName === RECORDING_BUCKET).bucketId;
    PDF_BUCKET_ID = buckets.find(({ bucketName }) => bucketName === PDF_BUCKET).bucketId;
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
  if (pdf) {
    proms.push(uploadPDF(pdf.name, pdf.path, pdf.mimetype));
  }
  if (finale) {
    proms.push(uploadArrangement(finale.name, finale.path, finale.mimetype));
  }
  if (recording) {
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

/** Adapt a file into a friendly file */
const adaptFile = (path, mimetype, arrangementName, bucketName, dot) => ({
  name: `${arrangementName.toLowerCase().replace(/\s/g, '_')}.${dot || mime.extension(mimetype)}`,
  mimetype,
  path,
  bucketName,
});
const fileAdapt = (f, name, bucket, dot) => adaptFile(f.path, f.mimetype, name, bucket, dot);

/** Adapt a files object with pdf/mus/recording keys into friendly files */
const adaptFiles = (files, name) => {
  const returnFiles = {};
  if (files.pdf && files.pdf.length) {
    returnFiles.pdf = fileAdapt(files.pdf[0], name, PDF_BUCKET);
  }
  if (files.finale && files.finale.length) {
    returnFiles.finale = fileAdapt(files.finale[0], name, ARRANGEMENT_BUCKET, 'mus');
  }
  if (files.recording && files.recording.length) {
    returnFiles.recording = fileAdapt(files.recording[0], name, RECORDING_BUCKET);
  }
  return returnFiles;
};

module.exports = {
  uploadArrangement,
  uploadRecording,
  uploadPDF,
  uploadFiles,
  adaptFiles,
  downloadFile,
};
