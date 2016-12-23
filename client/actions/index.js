import { stringify } from 'query-string';
import { reset, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import myFetch from './myFetch';
import {
  fullAlbumAdapter,
  fullArrangementAdapter,
  fullArtistAdapter,
  fullConcertAdapter,
  fullHangoverAdapter,
  fullSemesterAdapter,
} from '../normalizers/adaptFormData';

export const ALBUM_FORM = 'editAlbum';
export const ARRANGEMENT_FORM = 'addArrangement';
export const ARTIST_FORM = 'editArtist';
export const CONCERT_FORM = 'editConcert';
export const EDIT_FORM = 'editArrangement';
export const HANGOVER_FORM = 'editHangover';
export const SEMESTER_FORM = 'editSemester';

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
export const GET_EDIT_ALBUM = 'GET_EDIT_ALBUM';
export const GET_EDIT_ALBUM_SUCCESS = 'GET_EDIT_ALBUM_SUCCESS';
export const GET_EDIT_ALBUM_FAILURE = 'GET_EDIT_ALBUM_FAILURE';
export const GET_EDIT_ARRANGEMENT = 'GET_EDIT_ARRANGEMENT';
export const GET_EDIT_ARRANGEMENT_SUCCESS = 'GET_EDIT_ARRANGEMENT_SUCCESS';
export const GET_EDIT_ARRANGEMENT_FAILURE = 'GET_EDIT_ARRANGEMENT_FAILURE';
export const GET_EDIT_ARTIST = 'GET_EDIT_ARTIST';
export const GET_EDIT_ARTIST_SUCCESS = 'GET_EDIT_ARTIST_SUCCESS';
export const GET_EDIT_ARTIST_FAILURE = 'GET_EDIT_ARTIST_FAILURE';
export const GET_EDIT_HANGOVER = 'GET_EDIT_HANGOVER';
export const GET_EDIT_HANGOVER_SUCCESS = 'GET_EDIT_HANGOVER_SUCCESS';
export const GET_EDIT_HANGOVER_FAILURE = 'GET_EDIT_HANGOVER_FAILURE';
export const GET_EDIT_SEMESTER = 'GET_EDIT_SEMESTER';
export const GET_EDIT_SEMESTER_SUCCESS = 'GET_EDIT_SEMESTER_SUCCESS';
export const GET_EDIT_SEMESTER_FAILURE = 'GET_EDIT_SEMESTER_FAILURE';
export const GET_EDIT_CONCERT = 'GET_EDIT_CONCERT';
export const GET_EDIT_CONCERT_SUCCESS = 'GET_EDIT_CONCERT_SUCCESS';
export const GET_EDIT_CONCERT_FAILURE = 'GET_EDIT_CONCERT_FAILURE';
export const GET_HANGOVERS = 'GET_HANGOVERS';
export const GET_HANGOVERS_SUCCESS = 'GET_HANGOVERS_SUCCESS';
export const GET_HANGOVERS_FAILURE = 'GET_HANGOVERS_FAILURE';
export const GET_ARTISTS = 'GET_ARTISTS';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

export function setBanner(text, type) {
  return { type: SET_BANNER, text, bannerType: type };
}

export function closeBanner() {
  return { type: CLOSE_BANNER };
}

/** Helper action for everything that follows this basic format */
const actionFetch = (endpoint, START, SUCCESS, FAILURE, params) => (dispatch) => {
  dispatch({ type: START });
  return myFetch(`${endpoint}${params ? `?${stringify(params)}` : ''}`)
    .then(data => dispatch({ type: SUCCESS, data }))
    .catch(error => dispatch({ type: FAILURE, error }));
};

export const initializeForms = () => actionFetch('/api/initializeforms', INITIALIZE_FORMS, INITIALIZE_FORMS_SUCCESS, INITIALIZE_FORMS_FAILURE);

/** Actions for getting full top level objects */
export const getArrangement = arrangementID => actionFetch('/api/full/arrangement', GET_ARRANGEMENT, GET_ARRANGEMENT_SUCCESS, GET_ARRANGEMENT_FAILURE, { arrangementID });
export const getHangover = hangoverID => actionFetch('/api/full/hangover', GET_HANGOVER, GET_HANGOVER_SUCCESS, GET_HANGOVER_FAILURE, { hangoverID });
export const getSemester = semesterID => actionFetch('/api/full/semester', GET_SEMESTER, GET_SEMESTER_SUCCESS, GET_SEMESTER_FAILURE, { semesterID });
export const getConcert = concertID => actionFetch('/api/full/concert', GET_CONCERT, GET_CONCERT_SUCCESS, GET_CONCERT_FAILURE, { concertID });
export const getAlbum = albumID => actionFetch('/api/full/album', GET_ALBUM, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE, { albumID });
export const getArtist = artistID => actionFetch('/api/full/artist', GET_ARTIST, GET_ARTIST_SUCCESS, GET_ARTIST_FAILURE, { artistID });

/** Actions for getting paged lists */
export const getArrangements = skip => actionFetch('/api/list/arrangements', GET_ARRANGEMENTS, GET_ARRANGEMENTS_SUCCESS, GET_ARRANGEMENTS_FAILURE, { skip });
export const getHangovers = skip => actionFetch('/api/list/hangovers', GET_HANGOVERS, GET_HANGOVERS_SUCCESS, GET_HANGOVERS_FAILURE, { skip });
export const getArtists = skip => actionFetch('/api/list/artists', GET_ARTISTS, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAILURE, { skip });

export function getEditAlbumData(albumID) {
  return (dispatch) => {
    dispatch({ type: GET_EDIT_ALBUM });
    myFetch(`/api/full/album?${stringify({ albumID })}`)
      .then(data => dispatch({ type: GET_EDIT_ALBUM_SUCCESS, data: fullAlbumAdapter(data) }))
      .catch(error => dispatch({ type: GET_EDIT_ALBUM_FAILURE, error }));
  };
}

export function getEditArrangementData(arrangementID) {
  return (dispatch) => {
    dispatch({ type: GET_EDIT_ARRANGEMENT });
    myFetch(`/api/full/arrangement?${stringify({ arrangementID })}`)
      .then(data => dispatch({ type: GET_EDIT_ARRANGEMENT_SUCCESS, data: fullArrangementAdapter(data) }))
      .catch(error => dispatch({ type: GET_EDIT_ARRANGEMENT_FAILURE, error }));
  };
}

export function getEditArtistData(artistID) {
  return (dispatch) => {
    dispatch({ type: GET_EDIT_ARTIST });
    myFetch(`/api/full/artist?${stringify({ artistID })}`)
      .then(data => dispatch({ type: GET_EDIT_ARTIST_SUCCESS, data: fullArtistAdapter(data) }))
      .catch(error => dispatch({ type: GET_EDIT_ARTIST_FAILURE, error }));
  };
}

export function getEditConcertData(concertID) {
  return (dispatch) => {
    dispatch({ type: GET_EDIT_CONCERT });
    myFetch(`/api/full/concert?${stringify({ concertID })}`)
      .then(data => dispatch({ type: GET_EDIT_CONCERT_SUCCESS, data: fullConcertAdapter(data) }))
      .catch(error => dispatch({ type: GET_EDIT_CONCERT_FAILURE, error }));
  };
}

export function getEditHangoverData(hangoverID) {
  return (dispatch) => {
    dispatch({ type: GET_EDIT_HANGOVER });
    myFetch(`/api/full/hangover?${stringify({ hangoverID })}`)
      .then(data => dispatch({ type: GET_EDIT_HANGOVER_SUCCESS, data: fullHangoverAdapter(data) }))
      .catch(error => dispatch({ type: GET_EDIT_HANGOVER_FAILURE, error }));
  };
}

export function getEditSemesterData(semesterID) {
  return (dispatch) => {
    dispatch({ type: GET_EDIT_SEMESTER });
    myFetch(`/api/full/semester?${stringify({ semesterID })}`)
      .then(data => dispatch({ type: GET_EDIT_SEMESTER_SUCCESS, data: fullSemesterAdapter(data) }))
      .catch(error => dispatch({ type: GET_EDIT_SEMESTER_FAILURE, error }));
  };
}

export function destroyDocument(_id, _rev) {
  return dispatch =>
    myFetch(`/api/destroy?${stringify({ _id, _rev })}`, { method: 'DELETE' })
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

export function editAlbum(values) {
  return dispatch =>
    myFetch('/api/edit/album', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    }).then((json) => {
      // on success we show a happy message and head back to the home page
      dispatch(setBanner('Successfully edited album', BANNER_SUCCESS));
      dispatch(push('/'));
      dispatch(reset(ALBUM_FORM));
      return json;
    }).catch((error) => {
      dispatch(setBanner('Failed to edit album', BANNER_ERROR));
      throw new SubmissionError(error);
    });
}

export function editArtist(values) {
  return dispatch =>
    myFetch('/api/edit/artist', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    }).then((json) => {
      // on success we show a happy message and head back to the home page
      dispatch(setBanner('Successfully edited artist', BANNER_SUCCESS));
      dispatch(push('/'));
      dispatch(reset(ARTIST_FORM));
      return json;
    }).catch((error) => {
      dispatch(setBanner('Failed to edit artist', BANNER_ERROR));
      throw new SubmissionError(error);
    });
}

export function editConcert(values) {
  return dispatch =>
    myFetch('/api/edit/concert', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    }).then((json) => {
      // on success we show a happy message and head back to the home page
      dispatch(setBanner('Successfully edited concert', BANNER_SUCCESS));
      dispatch(push('/'));
      dispatch(reset(CONCERT_FORM));
      return json;
    }).catch((error) => {
      dispatch(setBanner('Failed to edit concert', BANNER_ERROR));
      throw new SubmissionError(error);
    });
}

export function editHangover(values) {
  return dispatch =>
    myFetch('/api/edit/hangover', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    }).then((json) => {
      // on success we show a happy message and head back to the home page
      dispatch(setBanner('Successfully edited hangover', BANNER_SUCCESS));
      dispatch(push('/'));
      dispatch(reset(HANGOVER_FORM));
      return json;
    }).catch((error) => {
      dispatch(setBanner('Failed to edit hangover', BANNER_ERROR));
      throw new SubmissionError(error);
    });
}

export function editSemester(values) {
  return dispatch =>
    myFetch('/api/edit/semester', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    }).then((json) => {
      // on success we show a happy message and head back to the home page
      dispatch(setBanner('Successfully edited semester', BANNER_SUCCESS));
      dispatch(push('/'));
      dispatch(reset(SEMESTER_FORM));
      return json;
    }).catch((error) => {
      dispatch(setBanner('Failed to edit semester', BANNER_ERROR));
      throw new SubmissionError(error);
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
        dispatch(reset(EDIT_FORM));
        return json;
      }).catch((e) => {
        // on failure we show a sad message but stay here in case user wants to resubmit
        dispatch(setBanner('Failed to edit arrangement', BANNER_ERROR));
        return e;
      });
}

function submitArrangement(values) {
  const formData = formatFormData(values);
  return myFetch('/api/arrangementsubmit', { method: 'POST', body: formData })
    .catch((error) => {
      throw new SubmissionError(error);
    });
}

function formatFormData(values) {
  const formData = new FormData();
  for (const key of Object.keys(values)) {
    if (values[key]) {
      if (key === '_attachments') {
        formData.append('_attachments', JSON.stringify(values._attachments));
      } else if (Array.isArray(values[key])) {
        for (let i = 0; i < values[key].length; i++) {
          formData.append(key, values[key][i]);
        }
      } else {
        formData.append(key, values[key]);
      }
    }
  }
  return formData;
}
