import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getEditArrangementData } from '../actions';
import validate from '../normalizers/validate';
import AddArrangementForm from '../components/AddArrangementForm';

class EditArrangement extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditArrangementData(id));
  }

  render() {
    return <AddArrangementForm {...this.props} />;
  }
}

EditArrangement.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isReuired,
};

// we want the app state
const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: 'editArrangement',
  destroyOnUnmount: false,
  validate,
})(EditArrangement));
