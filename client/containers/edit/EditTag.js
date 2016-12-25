import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { adaptTagSubmit } from '../../normalizers/adaptSubmit';
import RenderAsync from '../../components/form/RenderAsync';
import Button from '../../components/Button';
import { getEditTagData, editTag, TAG_FORM } from '../../actions';
import { searchArrangements } from '../../actions/search';
import { tagFormatter } from '../../normalizers/adaptFormData';

class EditTag extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getEditTagData(id));
  }

  render() {
    const { dispatch, handleSubmit, name } = this.props;
    return (
      <form onSubmit={handleSubmit(values => dispatch(editTag(adaptTagSubmit(values))))}>
        <h2>{name}</h2>
        <Field label="Arrangements" name="arrangements" component={RenderAsync} loadOptions={searchArrangements} multi />
        <Button type="submit" text="Submit" />
      </form>
    );
  }
}

EditTag.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state, routerProps) => ({
  app: state.app,
  id: routerProps.params.id,
  name: tagFormatter(state.form.editTag && state.form.editTag.values),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: TAG_FORM,
  destroyOnUnmount: false,
})(EditTag));
