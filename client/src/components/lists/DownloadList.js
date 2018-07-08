import React from 'react';
import PropTypes from 'prop-types';
import List from './_List';
import DownloadLink from '../links/DownloadLink';

const DownloadList = ({ title, arrangementName, type, downloads = [] }) =>
  <List title={title} items={downloads.map(download => ({ arrangementName, type, ...download }))} Component={DownloadLink} />;

DownloadList.propTypes = {
  title: PropTypes.string,
  arrangementName: PropTypes.string,
  downloads: PropTypes.array,
};

export default DownloadList;
