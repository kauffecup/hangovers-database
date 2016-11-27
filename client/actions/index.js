import { stringify } from 'query-string';
import { reset, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { hangoverAdapter, artistAdapter, fullArrangementAdapter, genreAdapter } from '../normalizers/adaptFormData';

export const ARRANGEMENT_FORM = 'addArrangement';
export const EDIT_FORM = 'editArrangement';

export const SET_BANNER = 'SET_BANNER';
export const BANNER_SUCCESS = 'BANNER_SUCCESS';
export const BANNER_ERROR = 'BANNER_ERROR';
export const CLOSE_BANNER = 'CLOSE_BANNER';
export const INITIALIZE_FORMS = 'INITIALIZE_FORMS';
export const INITIALIZE_FORMS_SUCCESS = 'INITIALIZE_FORMS_SUCCESS';
export const INITIALIZE_FORMS_FAILURE = 'INITIALIZE_FORMS_FAILURE';
export const ARRANGEMENT_SUBMIT = 'ARRANGEMENT_SUBMIT';
export const ARRANGEMENT_SUBMIT_SUCCESS = 'ARRANGEMENT_SUBMIT_SUCCESS';
export const ARRANGEMENT_SUBMIT_FAILURE = 'ARRANGEMENT_SUBMIT_FAILURE';
export const GET_ARRANGEMENTS = 'GET_ARRANGEMENTS';
export const GET_ARRANGEMENTS_SUCCESS = 'GET_ARRANGEMENTS_SUCCESS';
export const GET_ARRANGEMENTS_FAILURE = 'GET_ARRANGEMENTS_FAILURE';
export const GET_ARRANGEMENT = 'GET_ARRANGEMENT';
export const GET_ARRANGEMENT_SUCCESS = 'GET_ARRANGEMENT_SUCCESS';
export const GET_ARRANGEMENT_FAILURE = 'GET_ARRANGEMENT_FAILURE';
export const GET_HANGOVER = 'GET_HANGOVER';
export const GET_HANGOVER_SUCCESS = 'GET_HANGOVER_SUCCESS';
export const GET_HANGOVER_FAILURE = 'GET_HANGOVER_FAILURE';
export const GET_SEMESTER = 'GET_SEMESTER';
export const GET_SEMESTER_SUCCESS = 'GET_SEMESTER_SUCCESS';
export const GET_SEMESTER_FAILURE = 'GET_SEMESTER_FAILURE';
export const GET_CONCERT = 'GET_CONCERT';
export const GET_CONCERT_SUCCESS = 'GET_CONCERT_SUCCESS';
export const GET_CONCERT_FAILURE = 'GET_CONCERT_FAILURE';
export const GET_ALBUM = 'GET_ALBUM';
export const GET_ALBUM_SUCCESS = 'GET_ALBUM_SUCCESS';
export const GET_ALBUM_FAILURE = 'GET_ALBUM_FAILURE';
export const GET_ARTIST = 'GET_ARTIST';
export const GET_ARTIST_SUCCESS = 'GET_ARTIST_SUCCESS';
export const GET_ARTIST_FAILURE = 'GET_ARTIST_FAILURE';
export const GET_EDIT_ARRANGEMENT = 'GET_EDIT_ARRANGEMENT';
export const GET_EDIT_ARRANGEMENT_SUCCESS = 'GET_EDIT_ARRANGEMENT_SUCCESS';
export const GET_EDIT_ARRANGEMENT_FAILURE = 'GET_EDIT_ARRANGEMENT_FAILURE';
export const GET_HANGOVERS = 'GET_HANGOVERS';
export const GET_HANGOVERS_SUCCESS = 'GET_HANGOVERS_SUCCESS';
export const GET_HANGOVERS_FAILURE = 'GET_HANGOVERS_FAILURE';
export const GET_ARTISTS = 'GET_ARTISTS';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

// Here be some network functions. they probably don't belong here because they
// aren't technically actions! howeverrrrr the actions that use network functions
// define them all here so maybe they do? who knows

export function searchHangovers(hangover) {
  if (!hangover) {
    return Promise.resolve({ options: [] });
  }
  return _myFetch(`/search/hangovers?${stringify({ hangover: hangover.trim() })}`)
    .then(hangovers => ({ options: hangovers.map(hangoverAdapter) }));
}

export function searchArtists(artist) {
  if (!artist) {
    return Promise.resolve({ options: [] });
  }
  return _myFetch(`/search/artists?${stringify({ artist: artist.trim() })}`)
    .then(hangovers => ({ options: hangovers.map(artistAdapter) }));
}

export function searchGenres(genre) {
  if (!genre) {
    return Promise.resolve({ options: [] });
  }
  return _myFetch(`/search/genres?${stringify({ genre: genre.trim() })}`)
    .then(genres => ({ options: genres.map(genreAdapter) }));
}

export function arrangementExists(name) {
  return _myFetch(`/arrangementexists?${stringify({ name })}`);
}

// OK. here are some actual actions. like with types and whatnot.

export function setBanner(text, type) {
  return { type: SET_BANNER, text, bannerType: type };
}

export function closeBanner() {
  return { type: CLOSE_BANNER };
}

/** Helper action for everything that follows this basic format */
const actionFetch = (endpoint, START, SUCCESS, FAILURE, params) => (dispatch) => {
  dispatch({ type: START });
  return _myFetch(`${endpoint}${params ? `?${stringify(params)}` : ''}`)
    .then(data => dispatch({ type: SUCCESS, data }))
    .catch(error => dispatch({ type: FAILURE, error }));
};

export const initializeForms = () => actionFetch('/initializeforms', INITIALIZE_FORMS, INITIALIZE_FORMS_SUCCESS, INITIALIZE_FORMS_FAILURE);

/** Actions for getting full top level objects */
export const getArrangement = arrangementID => actionFetch('/full/arrangement', GET_ARRANGEMENT, GET_ARRANGEMENT_SUCCESS, GET_ARRANGEMENT_FAILURE, { arrangementID });
export const getHangover = hangoverID => actionFetch('/full/hangover', GET_HANGOVER, GET_HANGOVER_SUCCESS, GET_HANGOVER_FAILURE, { hangoverID });
export const getSemester = semesterID => actionFetch('/full/semester', GET_SEMESTER, GET_SEMESTER_SUCCESS, GET_SEMESTER_FAILURE, { semesterID });
export const getConcert = concertID => actionFetch('/full/concert', GET_CONCERT, GET_CONCERT_SUCCESS, GET_CONCERT_FAILURE, { concertID });
export const getAlbum = albumID => actionFetch('/full/album', GET_ALBUM, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE, { albumID });
export const getArtist = artistID => actionFetch('/full/artist', GET_ARTIST, GET_ARTIST_SUCCESS, GET_ARTIST_FAILURE, { artistID });

/** Actions for getting paged lists */
export const getArrangements = skip => actionFetch('/list/arrangements', GET_ARRANGEMENTS, GET_ARRANGEMENTS_SUCCESS, GET_ARRANGEMENTS_FAILURE, { skip });
export const getHangovers = skip => actionFetch('/list/hangovers', GET_HANGOVERS, GET_HANGOVERS_SUCCESS, GET_HANGOVERS_FAILURE, { skip });
export const getArtists = skip => actionFetch('/list/artists', GET_ARTISTS, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAILURE, { skip });

export function getEditArrangementData(arrangementID) {
  return (dispatch) => {
    dispatch({ type: GET_EDIT_ARRANGEMENT });
    _myFetch(`/full/arrangement?${stringify({ arrangementID })}`)
      .then(data => dispatch({ type: GET_EDIT_ARRANGEMENT_SUCCESS, data: fullArrangementAdapter(data) }))
      .catch(error => dispatch({ type: GET_EDIT_ARRANGEMENT_FAILURE, error }));
  };
}

export function destroyDocument(_id, _rev) {
  return dispatch =>
    _myFetch(`/destroy?${stringify({ _id, _rev })}`, { method: 'DELETE' })
      .then(() => {
        // on success we show a happy message and head back to the home page
        dispatch(setBanner('Successfully deleted that!', BANNER_SUCCESS));
        dispatch(push('/'));
      }).catch((e) => {
        // on failure we show a sad message but stay here in case user wants to try again
        dispatch(setBanner('Failed to delete that!', BANNER_ERROR));
        return e;
      });
}

export function addArrangement(values) {
  return dispatch =>
    submitArrangement(values)
      .then((json) => {
        // on success we show a happy message and head back to the home page
        dispatch(setBanner('Successfully added arrangement', BANNER_SUCCESS));
        dispatch(push('/'));
        dispatch(reset(ARRANGEMENT_FORM));
        return json;
      }).catch((e) => {
        // on failure we show a sad message but stay here in case user wants to resubmit
        dispatch(setBanner('Failed to add arrangement', BANNER_ERROR));
        return e;
      });
}

export function editArrangement(values) {
  return dispatch =>
    submitArrangement(values)
      .then((json) => {
        // on success we show a happy message and head back to the home page
        dispatch(setBanner('Successfully edited arrangement', BANNER_SUCCESS));
        dispatch(push('/'));
        return json;
      }).catch((e) => {
        // on failure we show a sad message but stay here in case user wants to resubmit
        dispatch(setBanner('Failed to edit arrangement', BANNER_ERROR));
        return e;
      });
}

function submitArrangement(values) {
  const formData = new FormData();
  for (const key of Object.keys(values)) {
    if (values[key]) {
      if (Array.isArray(values[key])) {
        for (let i = 0; i < values[key].length; i++) {
          formData.append(key, values[key][i]);
        }
      } else {
        formData.append(key, values[key]);
      }
    }
  }
  return _myFetch('/arrangementsubmit', { method: 'POST', body: formData })
    .catch((error) => {
      throw new SubmissionError(error);
    });
}

function _myFetch(endpoint, opts) {
  return fetch(endpoint, opts)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    });
}
