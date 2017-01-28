import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Dropzone from 'react-dropzone';
import _Render from './_Render';
import { BERMUDA_GRAY } from '../../StyleConstants';

const _RenderDropzone = (props) => {
  const hasFile = props.input.value;
  const text = hasFile ? `To replace ${props.input.value.name}, drop a file here, or click to select one to upload.`
    : 'Drop a file here, or click to select one to upload.';
  return (
    <div className={css(styles.dropContainer)}>
      <Dropzone
        name={props.name}
        onDrop={props.input.onChange}
        onBlur={() => props.input.onBlur(props.input.value)}
        multiple={false}
        className={css(styles.dropzone)}
        activeClassName={css(styles.activeDropzone)}
      >
        <div>{text}</div>
      </Dropzone>
      {props.input.value ?
        <div>
          {props.input.value.name}
          <button type="button" className={css(styles.removeButton)} onClick={() => props.handleFileRemove(props.input.value.name)}>x</button>
        </div>
      : null}
    </div>
  );
};

const styles = StyleSheet.create({
  dropContainer: {
    flex: 1,
  },
  dropzone: {
    height: '100px',
    border: '1px dashed #d9d9d9',
    borderRadius: '4px',
    color: '#aaa',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'text-align': 'center',
    padding: '0px 40px',
    cursor: 'pointer',
  },
  activeDropzone: {
    border: '1px solid #3f51b5',
    backgroundColor: '#eee',
    color: '#000',
  },
  removeButton: {
    color: BERMUDA_GRAY,
    height: '20px',
    'line-height': '20px',
    'margin-left': '6px',
  },
});

_RenderDropzone.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  handleFileRemove: PropTypes.func,
};

export default _Render(_RenderDropzone);
