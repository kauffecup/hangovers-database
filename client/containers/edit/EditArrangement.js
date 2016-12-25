import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getEditArrangementData, editArrangement, destroyDocument, EDIT_FORM } from '../../actions';
import validate from '../../normalizers/validate';
import SubmitArrangementForm from '../../components/SubmitArrangementForm';

class EditArrangement extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditArrangementData(id));
  }

  render() {
    const { dispatch, id, rev, name } = this.props;
    return (
      <SubmitArrangementForm
        {...this.props}
        submit={values => dispatch(editArrangement(values))}
        handleDelete={(_id, _rev) => dispatch(destroyDocument(_id, _rev))}
        id={id}
        name={name}
        rev={rev}
        edit
      />
    );
  }
}

EditArrangement.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isReuired,
  name: PropTypes.string.isRequired,
  rev: PropTypes.string,
};

// we want the app state
const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: state.form.editArrangement && state.form.editArrangement.values && state.form.editArrangement.values.name,
  rev: state.form && state.form.editArrangement && state.form.editArrangement.values && state.form.editArrangement.values._rev,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_FORM,
  destroyOnUnmount: false,
  validate,
})(EditArrangement));
