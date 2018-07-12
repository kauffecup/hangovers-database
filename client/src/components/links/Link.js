import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ link }) => {
  const { url, displayName } = link;
  return (
    <a href={url || link} target={"_blank"} rel="noopener noreferrer">{displayName || link}</a>
  );
};

Link.propTypes = {
  link: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.objectOf({
      url: PropTypes.string,
      displayName: PropTypes.string,
    }),
  ]),
};

export default Link;
