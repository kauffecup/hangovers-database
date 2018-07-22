import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { StyleSheet, css } from 'aphrodite';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import get from 'lodash/get';
import { LOG_IN_FORM, createAccount, login } from '../actions';
import RenderField from '../components/form/RenderField';
import Button from '../components/Button';
import { FROLY } from '../StyleConstants';

class Login extends Component {
  handleSubmit = async (values) => {
    const { dispatch } = this.props;
    try {
      await login(values);
      dispatch(push('/'));
    } catch (e) {
      throw new SubmissionError({ _error: 'Incorrect username or password' });
    }
  }

  handleSignUp = async () => {
    const { dispatch, user } = this.props;
    try {
      await createAccount(user);
      dispatch(push('/'));
    } catch (e) {
      const error = await e.json();
      throw new SubmissionError({ _error: error.errorMessage });
    }
  }

  render() {
    const { error } = this.props;
    return (
      <div className={css(styles.login)}>
        <form className={css(styles.form)} onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field label="Username" name="username" component={RenderField} type="text" autoComplete="off" noLabel />
          <Field label="Password" name="password" component={RenderField} type="password" autoComplete="off" noLabel />
          {error && <div className={css(styles.error)}>{error}</div>}
          <div className={css(styles.buttons)}>
            <Button type="submit" text="Log In" simple />
            <Button type="button" text="Sign Up" handleClick={this.props.handleSubmit(this.handleSignUp)} success simple />
          </div>
        </form>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  form: {
    width: '500px',
    margin: '66px auto',
    display: 'flex',
    'flex-direction': 'column',
  },
  buttons: {
    display: 'flex',
    'flex-direction': 'column',
    width: '200px',
    margin: '11px auto',
    height: '88px',
    'justify-content': 'space-between',
  },
  error: {
    color: FROLY,
  },
});

const mapStateToProps = (state) => ({
  user: get(state, `form.${LOG_IN_FORM}.values`, {})
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: LOG_IN_FORM,
  destroyOnUnmount: true,
})(Login));
