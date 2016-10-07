import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddArrangementForm from '../components/AddArrangementForm';
import {
  initializeForms,
  submitArrangement,
  searchHangovers,
  searchArtists,
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
    const { arrangementTypes, qualities, semesters, albums, concerts, genres } = app;
    return (
      <div className="sage">
        <h1>Sage</h1>
        <AddArrangementForm
          onSubmit={values => dispatch(submitArrangement(values))}
          keys={keys}
          hangoversLoadOptions={searchHangovers}
          artistsLoadOptions={searchArtists}
          arrangementTypes={arrangementTypes.map(at => ({
            value: at._id, label: `${at.name} (${at.description})`,
          }))}
          qualities={qualities.map(q => ({
            value: q._id, label: `${q.name} (${q.description})`,
          }))}
          semesters={semesters.map(s => ({
            value: s._id, label: `${s.semester_type} ${s.year}`,
          }))}
          albums={albums.map(a => ({
            value: a._id, label: `${a.name} (${a.year})`,
          }))}
          concerts={concerts.map(c => ({
            value: c._id, label: `${c.name}`,
          }))}
          genres={genres.map(g => ({
            value: g._id, label: `${g.name}`,
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
