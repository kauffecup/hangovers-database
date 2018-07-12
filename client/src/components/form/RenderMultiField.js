import React from 'react';
import PropTypes from 'prop-types';
import { Creatable } from 'react-select';
import { StyleSheet, css } from 'aphrodite';
import Value from 'react-select/lib/Value';
import _Render from './_Render';

const MultiField = React.createClass({
  getInitialState () {
    return {
      inputValue: '',
    };
  },

  getFocusedOption() {
    return this.props.filterOptions([], this.state.inputValue, [], {})[0];
  },

  selectValue(value) {
    this.setState({
      inputValue: '',
    });
    this.props.onChange([...this.props.input.value, value]);
  },

  filterOptions() {
    return [];
  },

  handleInputChange (event) {
    let newInputValue = event.target.value;

    if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
      this.props.onInputChange(newInputValue);
    }

    this.setState({
      inputValue: newInputValue
    });
  },

  handleKeyDown(event) {
    this.props.onInputKeyDown(event);
    if (!this.state.inputValue && (event.keyCode === 8 || event.keyCode === 46)) {
      const value = this.getValue();
      const newValue = value.slice(0, value.length - 1);
      this.props.onChange(newValue);
    }
  },
  
  getValue() {
    const { input: { value = [] } } = this.props;
    return [].concat(value).filter(url => url);
  },

  removeValue(value) {
    const newValue = this.getValue().filter((url) => url !== value);
    this.props.onChange(newValue);
  },

  render() {
    return (
      <div className={css(styles.inputWrapper) + " Select--multi " + this.props.className}>
        {this.getValue().map((url) => (
          <Value
            value={url}
            onRemove={this.removeValue}
          >
            {url}
          </Value>
        ))}
        <input
          {...this.props}
          className={css(styles.input)}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleInputChange}
          value={this.state.inputValue}
        />
      </div>
    )
  },
});

const _RenderMultiField = props =>
  <Creatable
    {...props}
    onBlur={() => props.input.onBlur(props.input.value)}
    value={props.input.value}
    onChange={props.input.onChange}
    children={(props) => <MultiField {...props} />}
    newOptionCreator={({ label }) => label}
  />

const styles = StyleSheet.create({
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

_RenderMultiField.propTypes = {
  input: PropTypes.object.isRequired,
};

export default _Render(_RenderMultiField);
