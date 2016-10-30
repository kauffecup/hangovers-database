import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import validate from '../normalizers/validate';
import AddArrangementForm from '../components/AddArrangementForm';

// for now, we want it all!
// we want the app state
const mapStateToProps = state => ({
  app: state.app,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(reduxForm({
  form: 'addArrangement',
  destroyOnUnmount: false,
  validate,
})(AddArrangementForm));
