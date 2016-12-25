import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptConcertSubmit } from '../../normalizers/adaptSubmit';
import RenderSelect from '../../components/form/RenderSelect';
import RenderAsync from '../../components/form/RenderAsync';
import Button from '../../components/Button';
import { getEditConcertData, editConcert, CONCERT_FORM } from '../../actions';
import {
  searchArrangements,
  searchHangovers,
} from '../../actions/search';
import {
  concertFormatter,
  concertTypeAdapter,
  semesterAdapter,
} from '../../normalizers/adaptFormData';

class EditConcert extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditConcertData(id));
  }

  render() {
    const { app, dispatch, handleSubmit, name } = this.props;
    const { concertTypes: ct, semesters: s } = app;
    const concertTypes = ct.map(concertTypeAdapter);
    const semesters = s.map(semesterAdapter);
    return (
      <form onSubmit={handleSubmit(values => dispatch(editConcert(adaptConcertSubmit(values))))}>
        <h2>{name}</h2>
        <Field label="Type" name="concertType" component={RenderSelect} options={concertTypes} />
        <Field label="MD" name="md" component={RenderAsync} loadOptions={searchHangovers} multi />
        <Field label="Semester" name="semester" component={RenderSelect} options={semesters} />
        <Field label="Set List" name="setList" component={RenderAsync} loadOptions={searchArrangements} multi />
        <Button type="submit" text="Submit" />
      </form>
    );
  }
}

EditConcert.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: concertFormatter(state.form.editConcert && state.form.editConcert.values),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: CONCERT_FORM,
  destroyOnUnmount: false,
})(EditConcert));
