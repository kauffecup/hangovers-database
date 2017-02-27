import React from 'react';
import RenderSelect from './RenderSelect';

const options = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
];

const RenderBinary = props =>
  <RenderSelect {...props} options={options} />;

export default RenderBinary;
