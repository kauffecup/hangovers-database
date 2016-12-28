import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptTagSubmit } from '../../normalizers/adaptSubmit';
import RenderAsync from '../../components/form/RenderAsync';
import { getEditTagData, destroyTag, editTag, TAG_FORM } from '../../actions';
import { searchArrangements } from '../../actions/search';
import { tagFormatter } from '../../normalizers/adaptFormData';
import Edit from '../../components/pages/Edit';

const EditTag = ({ dispatch, handleSubmit, name, id, rev, loading }) =>
  <Edit
    title={name}
    getEditData={() => dispatch(getEditTagData(id))}
    handleSubmit={handleSubmit(values => dispatch(editTag(adaptTagSubmit(values))))}
    handleDelete={() => dispatch(destroyTag(id, rev))}
    loading={loading}
  >
    <Field label="Arrangements" name="arrangements" component={RenderAsync} loadOptions={searchArrangements} multi />
  </Edit>;

EditTag.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  rev: PropTypes.string,
  name: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: tagFormatter(state.form[TAG_FORM] && state.form[TAG_FORM].values),
  rev: state.form && state.form[TAG_FORM] && state.form[TAG_FORM].values && state.form[TAG_FORM].values._rev,
  loading: state.form[TAG_FORM] && state.form[TAG_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: TAG_FORM,
  destroyOnUnmount: false,
})(EditTag));
