import React, { PropTypes } from 'react';
import DisplayField from '../DisplayField';

const List = ({ title, items = [], Component }) =>
  <DisplayField title={title}>
    <span>{[].concat(items).filter(item => !!item)
      .map(item => <Component key={item._id} {...item} />)
      .reduce((cs, c) => cs === null ? [c] : [...cs, ', ', c], null)
    }</span>
  </DisplayField>;

List.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  Component: PropTypes.object.isRequired,
};

export default List;
