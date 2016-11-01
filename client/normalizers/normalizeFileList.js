const normalizeFileList = (fileList) => {
  if (!fileList || !fileList.length || fileList.inCloudant) {
    return fileList;
  }
  return fileList[0];
};

export default normalizeFileList;
