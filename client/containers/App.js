import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AddArrangementForm from '../components/AddArrangementForm';
import {
  submitArrangement,
} from '../actions';

const Sage = ({ dispatch }) => (
  <div className="sage">
    <h1>Sage</h1>
    <AddArrangementForm onSubmit={values => dispatch(submitArrangement(values))} />
  </div>
);

Sage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// for now, we want it all!
const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(Sage);
