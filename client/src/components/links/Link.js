import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ url, displayName }) => {
  return (
    <a href={url} target={"_blank"} rel="noopener noreferrer">{displayName || url}</a>
  );
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  displayName: PropTypes.string,
};

export default Link;
