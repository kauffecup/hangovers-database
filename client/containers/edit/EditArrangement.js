import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getEditArrangementData, editArrangement, destroyArrangement, EDIT_FORM } from '../../actions';
import validate from '../../normalizers/validate';
import SubmitArrangementForm from '../../components/SubmitArrangementForm';
import { arrangementFormatter } from '../../normalizers/adaptFormData';

class EditArrangement extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditArrangementData(id));
  }

  render() {
    const { dispatch, id, rev, name, loading } = this.props;
    return (
      <SubmitArrangementForm
        {...this.props}
        submit={values => dispatch(editArrangement(values))}
        handleDelete={(_id, _rev) => dispatch(destroyArrangement(_id, _rev))}
        id={id}
        name={name}
        rev={rev}
        loading={loading}
        edit
      />
    );
  }
}

EditArrangement.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rev: PropTypes.string,
  loading: PropTypes.bool,
};

// we want the app state
const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: arrangementFormatter(state.form[EDIT_FORM] && state.form[EDIT_FORM].values),
  rev: state.form && state.form[EDIT_FORM] && state.form[EDIT_FORM].values && state.form[EDIT_FORM].values._rev,
  loading: state.form[EDIT_FORM] && state.form[EDIT_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: EDIT_FORM,
  destroyOnUnmount: false,
  validate,
})(EditArrangement));
