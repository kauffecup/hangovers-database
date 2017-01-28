import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import RenderAsync from '../../components/form/RenderAsync';
import RenderField from '../../components/form/RenderField';
import { searchArrangements } from '../../actions/search';

const SubmitTagForm = ({ editName }) =>
  <div>
    {editName ? <Field label="Name" name="name" component={RenderField} type="text" autoComplete="off" /> : null}
    <Field label="Arrangements" name="arrangements" component={RenderAsync} loadOptions={searchArrangements} multi />
  </div>;

SubmitTagForm.propTypes = {
  editName: PropTypes.bool,
};

export default SubmitTagForm;
