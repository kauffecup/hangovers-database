import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import _Render from './_Render';

const _RenderBinary = ({ name }) =>
  <div>
    <label htmlFor={name}><Field name={name} component="input" type="radio" value="yes" />Yes</label>
    <label htmlFor={name}><Field name={name} component="input" type="radio" value="no" />No</label>
  </div>;

_RenderBinary.propTypes = {
  name: PropTypes.string.isRequired,
};

export default _Render(_RenderBinary);
