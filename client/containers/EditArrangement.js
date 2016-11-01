import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getEditArrangementData, editArrangement, destroyDocument } from '../actions';
import validate from '../normalizers/validate';
import SubmitArrangementForm from '../components/SubmitArrangementForm';

class EditArrangement extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditArrangementData(id));
  }

  render() {
    const { dispatch, id, rev } = this.props;
    return (
      <SubmitArrangementForm
        {...this.props}
        submit={values => dispatch(editArrangement(values))}
        handleDelete={(_id, _rev) => dispatch(destroyDocument(_id, _rev))}
        id={id}
        rev={rev}
      />
    );
  }
}

EditArrangement.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isReuired,
  rev: PropTypes.string,
};

// we want the app state
const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  rev: state.form && state.form.editArrangement && state.form.editArrangement.values && state.form.editArrangement.values._rev,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: 'editArrangement',
  destroyOnUnmount: false,
  validate,
})(EditArrangement));
