import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Dropzone from 'react-dropzone';
import _Render from './_Render';
import { REGENT_GRAY } from '../../StyleConstants';

const handleFileDrop = (currentValue, newFiles) => {
  return currentValue ? [...currentValue, ...newFiles] : [...newFiles];
};

const handleVersionUpdate = (currentValue, index, newVersion) => currentValue.map((file, i) => {
  if (i !== index) { return file; }
  file.version = newVersion;
  return file;
});

const handleFileRemove = (currentValue, index, bucketName) => currentValue.map((file, i) => {
  if (i !== index) { return file; }
  return bucketName ? { deleted: true, fileName: file.name, bucketName } : undefined;
}).filter(file => file);

const _RenderDropzone = (props) => {
  const hasFiles = props.input.value && props.input.value.length && !props.input.value.deleted;
  return (
    <div className={css(styles.dropContainer)}>
      <Dropzone
        name={props.name}
        onDrop={newFile => props.input.onChange(handleFileDrop(props.input.value, newFile))}
        onBlur={() => props.input.onBlur(props.input.value)}
        multiple={true}
        className={css(styles.dropzone)}
        activeClassName={css(styles.activeDropzone)}
      >
        <div>Drop a file here, or click to select one to upload.</div>
      </Dropzone>
      {hasFiles ? props.input.value.map(({ name, version }, i) => (
        <div>
          {name}
          <button
            type="button"
            className={css(styles.removeButton)}
            onClick={() => props.input.onChange(handleFileRemove(props.input.value, i, props.input.value.bucketName))}
          >
            x
          </button>
          <div className={css(styles.inputWrapper)}>
            <input
              className={css(styles.input)}
              value={version}
              onChange={(event) => props.input.onChange(handleVersionUpdate(props.input.value, i, event.target.value))}
              type="text"
            />
          </div>
        </div>
      )) : null}
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
    color: REGENT_GRAY,
    height: '20px',
    'line-height': '20px',
    'margin-left': '6px',
  },
  inputWrapper: {
    display: 'flex',
    height: '36px',
    border: '1px solid #d9d9d9',
    'border-radius': '4px',
  },
  input: {
    flex: 1,
    height: '100%',
    border: 'none',
    padding: '0px 10px',
    'font-family': '\'Lato\', sans-serif',
    'font-weight': 'lighter',
    'font-size': '1em',
  },
});

_RenderDropzone.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default _Render(_RenderDropzone);
