import React from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';

const DownloadLink = ({ arrangementName, name: fileName, bucketName, version, type }) => {
  const downloadLink = `/api/file?${stringify({ fileName, bucketName })}`;
  const title = arrangementName + (version ? ` (${version})` : '') + ` (${type})`;
  return (
    <a href={downloadLink}  rel="noopener noreferrer" download >{title}</a>
  )
}

DownloadLink.propTypes = {
  arrangementName: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  bucketName: PropTypes.string.isRequired,
  version: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default DownloadLink;
