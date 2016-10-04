import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddArrangementForm from '../components/AddArrangementForm';
import {
  initializeForms,
  submitArrangement,
} from '../actions';

// TODO: move these to database?
const keys = [
  { key: 'key_a', label: 'A' },
  { key: 'key_b_b', label: 'Bb' },
  { key: 'key_b', label: 'B' },
  { key: 'key_c', label: 'C' },
  { key: 'key_c_#', label: 'C#' },
  { key: 'key_d', label: 'D' },
  { key: 'key_e_b', label: 'Eb' },
  { key: 'key_e', label: 'E' },
  { key: 'key_f', label: 'F' },
  { key: 'key_f_#', label: 'F#' },
  { key: 'key_g', label: 'G' },
  { key: 'key_a_b', label: 'Ab' },
];

class Sage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initializeForms());
  }

  render() {
    const { dispatch, app } = this.props;
    const { arrangementTypes: { rows: arrangementTypes }, qualities: { rows: qualities } } = app;
    return (
      <div className="sage">
        <h1>Sage</h1>
        <AddArrangementForm
          onSubmit={values => dispatch(submitArrangement(values))}
          keys={keys}
          arrangementTypes={arrangementTypes.map(at => ({
            key: at.doc._id, label: `${at.doc.name} (${at.doc.description})`,
          }))}
          qualities={qualities.map(q => ({
            key: q.doc._id, label: `${q.doc.name} (${q.doc.description})`,
          }))}
        />
      </div>
    );
  }
}

Sage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  app: PropTypes.object,
};

// for now, we want it all!
const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(Sage);
