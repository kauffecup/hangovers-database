import React, { PropTypes } from 'react';
import { AsyncCreatable } from 'react-select';
import _Render from './_Render';

const _RenderCreatableAsync = props =>
  <AsyncCreatable
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
  />;

_RenderCreatableAsync.propTypes = {
  input: PropTypes.object.isRequired,
};

export default _Render(_RenderCreatableAsync);
