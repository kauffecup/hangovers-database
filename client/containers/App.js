import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddArrangementForm from '../components/AddArrangementForm';
import {
  arrangementAdapter,
  qualityAdapter,
  semesterAdapter,
  albumAdapter,
  concertAdapter,
  genreAdapter,
  keyAdapter,
} from '../normalizers/normalizeFormData';
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
          arrangementTypes={arrangementTypes.map(arrangementAdapter)}
          qualities={qualities.map(qualityAdapter)}
          semesters={semesters.map(semesterAdapter)}
          albums={albums.map(albumAdapter)}
          concerts={concerts.map(concertAdapter)}
          genres={genres.map(genreAdapter)}
          keys={keys.map(keyAdapter)}
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
