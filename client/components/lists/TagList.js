import React, { PropTypes } from 'react';
import List from './_List';
import TagLink from '../links/TagLink';

const TagList = ({ title, tags = [] }) =>
  <List title={title} items={tags} Component={TagLink} />;

TagList.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.array,
};

export default TagList;