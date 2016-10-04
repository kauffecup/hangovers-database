const normalizeFileList = (fileList) => {
  if (!fileList || !fileList.length) {
    return fileList;
  }
  return fileList[0];
};

export default normalizeFileList;
