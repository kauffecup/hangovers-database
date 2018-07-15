import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { reduxForm, Field } from 'redux-form';
import get from 'lodash/get';
import { LOG_IN_FORM, createAccount, login } from '../actions';
import RenderField from '../components/form/RenderField';
import Button from '../components/Button';

class Login extends Component {
  handleSubmit = async (values) => {
    try {
      await login(values);
      this.props.router.push('/');
    } catch (e) {
      console.error(e);
    }
  }

  handleSignUp = async () => {
    const { user } = this.props;
    try {
      await createAccount(user);
      this.props.router.push('/');
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field label="Username" name="username" component={RenderField} type="text" autoComplete="off" />
        <Field label="Password" name="password" component={RenderField} type="password" autoComplete="off" />
        <Button type="submit" text="Log In" />
        <Button type="button" text="Sign Up" handleClick={this.handleSignUp} />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: get(state, `form.${LOG_IN_FORM}.values`, {})
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: LOG_IN_FORM,
  destroyOnUnmount: true,
})(Login));
