import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddArrangementForm from '../components/AddArrangementForm';
import {
  initializeForms,
  submitArrangement,
  searchHangovers,
  searchArtists,
} from '../actions';

class Sage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initializeForms());
  }

  render() {
    const { dispatch, app } = this.props;
    const { arrangementTypes, qualities, semesters, albums, concerts, genres, keys } = app;
    return (
      <div className="sage">
        <h1>Sage</h1>
        <AddArrangementForm
          onSubmit={values => dispatch(submitArrangement(values))}
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
          keys={keys.map(k => ({
            value: k._id, label: k.name,
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
