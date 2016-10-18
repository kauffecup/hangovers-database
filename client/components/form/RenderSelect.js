import React, { PropTypes } from 'react';
import Select from 'react-select';
import _Render from './_Render';

const _RenderSelect = props =>
  <Select
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
  />;

_RenderSelect.propTypes = {
  input: PropTypes.object.isRequired,
};

export default _Render(_RenderSelect);
