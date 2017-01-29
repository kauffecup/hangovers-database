import React, { PropTypes } from 'react';
import RenderSelect from './RenderSelect';

const options = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
];

const RenderBinary = props =>
  <RenderSelect {...props} options={options} />;

RenderBinary.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RenderBinary;
