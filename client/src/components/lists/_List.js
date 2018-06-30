import React from 'react';
import PropTypes from 'prop-types';
import DisplayField from '../DisplayField';

const List = ({ title, items = [], Component }) =>
  <DisplayField title={title}>
    <span>{[].concat(items).filter(item => !!item)
      .map(item => <Component {...item} key={item._id} />)
      .reduce((cs, c) => cs === null ? [c] : [...cs, ', ', c], null)
    }</span>
  </DisplayField>;

List.propTypes = {
  title: PropTypes.string,
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  Component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};

export default List;
