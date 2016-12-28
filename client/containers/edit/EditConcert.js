import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptConcertSubmit } from '../../normalizers/adaptSubmit';
import { getEditConcertData, editConcert, CONCERT_FORM } from '../../actions';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import Edit from '../../components/pages/Edit';
import {
  searchArrangements,
  searchHangovers,
} from '../../actions/search';
import {
  concertFormatter,
  concertTypeAdapter,
  semesterAdapter,
} from '../../normalizers/adaptFormData';

const EditConcert = ({ app, dispatch, handleSubmit, name, id, loading }) => {
  const { concertTypes: ct, semesters: s } = app;
  const concertTypes = ct.map(concertTypeAdapter);
  const semesters = s.map(semesterAdapter);
  return (
    <Edit
      title={name}
      getEditData={() => dispatch(getEditConcertData(id))}
      handleSubmit={handleSubmit(values => dispatch(editConcert(adaptConcertSubmit(values))))}
      loading={loading}
    >
      <Field label="Type" name="concertType" component={RenderSelect} options={concertTypes} />
      <Field label="MD" name="md" component={RenderAsync} loadOptions={searchHangovers} multi />
      <Field label="Semester" name="semester" component={RenderSelect} options={semesters} />
      <Field label="Set List" name="setList" component={RenderAsync} loadOptions={searchArrangements} multi />
    </Edit>
  );
};

EditConcert.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  name: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: concertFormatter(state.form[CONCERT_FORM] && state.form[CONCERT_FORM].values),
  loading: state.form[CONCERT_FORM] && state.form[CONCERT_FORM].loading,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: CONCERT_FORM,
  destroyOnUnmount: false,
})(EditConcert));
