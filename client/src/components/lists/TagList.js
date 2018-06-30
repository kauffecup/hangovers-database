import React from 'react';
import PropTypes from 'prop-types';
import List from './_List';
import TagLink from '../links/TagLink';

const TagList = ({ title, tags = [] }) =>
  <List title={title} items={tags} Component={TagLink} />;

TagList.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default TagList;
