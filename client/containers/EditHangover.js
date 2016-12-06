import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptHangoverSubmit } from '../normalizers/adaptSubmit';
import RenderSelect from '../components/form/RenderSelect';
import ArrangementList from '../components/lists/ArrangementList';
import Button from '../components/Button';
import { getEditHangoverData, editHangover } from '../actions';
import {
  semesterAdapter,
  concertAdapter,
  hangoverFormatter,
} from '../normalizers/adaptFormData';

class EditHangover extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditHangoverData(id));
  }

  render() {
    const { app, dispatch, handleSubmit, name, arrangements, soloed } = this.props;
    const { semesterMap, semesters: s, concerts: co } = app;
    const semesters = s.map(semesterAdapter);
    const concerts = co.map(c => concertAdapter(c, semesterMap));
    return (
      <form onSubmit={handleSubmit(values => dispatch(editHangover(adaptHangoverSubmit(values))))}>
        <h2>{name}</h2>
        <Field label="Graduated" name="graduationSemester" component={RenderSelect} options={semesters} />
        <Field label="Concert(s) MDed" name="concertsMDed" component={RenderSelect} options={concerts} multi />
        <Field label="Semester(s) MDed" name="semestersMDed" component={RenderSelect} options={semesters} multi />
        <Field label="Semester(s) BMed" name="semestersBMed" component={RenderSelect} options={semesters} multi />
        <Field label="Semester(s) Presided" name="semestersPresided" component={RenderSelect} options={semesters} multi />
        <h3>Arranged (to edit, update arrangement.)</h3>
        <ArrangementList arrangements={arrangements} />
        <h3>Soloed (to edit, update arrangement.)</h3>
        <ArrangementList arrangements={soloed} />
        <Button type="submit" text="Submit" />
      </form>
    );
  }
}

EditHangover.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isReuired,
  app: PropTypes.object.isRequired,
  name: PropTypes.string,
  arrangements: PropTypes.object,
  soloed: PropTypes.object,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: hangoverFormatter(state.form.editHangover && state.form.editHangover.values),
  arrangements: state.form.editHangover && state.form.editHangover.values && state.form.editHangover.values.arrangers,
  soloed: state.form.editHangover && state.form.editHangover.values && state.form.editHangover.values.soloists,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: 'editHangover',
  destroyOnUnmount: false,
})(EditHangover));
