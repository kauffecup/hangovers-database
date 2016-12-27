import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptHangoverSubmit } from '../../normalizers/adaptSubmit';
import { getEditHangoverData, editHangover, HANGOVER_FORM } from '../../actions';
import { searchArrangements } from '../../actions/search';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import Edit from '../../components/pages/Edit';
import {
  semesterAdapter,
  concertAdapter,
  hangoverFormatter,
} from '../../normalizers/adaptFormData';

const EditHangover = ({ app, dispatch, handleSubmit, name, id }) => {
  const { semesters: s, concerts: co } = app;
  const semesters = s.map(semesterAdapter);
  const concerts = co.map(c => concertAdapter(c));
  return (
    <Edit
      title={name}
      getEditData={() => dispatch(getEditHangoverData(id))}
      handleSubmit={handleSubmit(values => dispatch(editHangover(adaptHangoverSubmit(values))))}
    >
      <Field label="Graduated" name="graduationSemester" component={RenderSelect} options={semesters} multi />
      <Field label="Concert(s) MDed" name="concertsMDed" component={RenderSelect} options={concerts} multi />
      <Field label="Semester(s) MDed" name="semestersMDed" component={RenderSelect} options={semesters} multi />
      <Field label="Semester(s) BMed" name="semestersBMed" component={RenderSelect} options={semesters} multi />
      <Field label="Semester(s) Presided" name="semestersPresided" component={RenderSelect} options={semesters} multi />
      <Field label="Arranged" name="arranged" component={RenderAsync} loadOptions={searchArrangements} multi />
      <Field label="Soloed" name="soloed" component={RenderAsync} loadOptions={searchArrangements} multi />
    </Edit>
  );
};

EditHangover.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: hangoverFormatter(state.form[HANGOVER_FORM] && state.form[HANGOVER_FORM].values),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: HANGOVER_FORM,
  destroyOnUnmount: false,
})(EditHangover));
