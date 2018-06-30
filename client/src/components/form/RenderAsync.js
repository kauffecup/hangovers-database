import React from 'react';
import PropTypes from 'prop-types';
import { Async } from 'react-select';
import _Render from './_Render';

const _RenderAsync = props =>
  <Async
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
  />;

_RenderAsync.propTypes = {
  input: PropTypes.object.isRequired,
};

export default _Render(_RenderAsync);
