import React, { PropTypes } from 'react';

const HangoverList = ({ title, items = [], Component }) => items.length ?
  <div>
    <span>{title}</span>
    <span>{items.filter(item => !!item).map(item =>
      <Component key={item._id} {...item} />
    )}</span>
  </div> : null;

HangoverList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  Component: PropTypes.object.isRequired,
};

export default HangoverList;
