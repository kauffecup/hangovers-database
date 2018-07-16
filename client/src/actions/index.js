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
  fullTagAdapter,
  fullNonHangoverAdapter,
} from '../normalizers/adaptFormData';

// auth forms
export const LOG_IN_FORM = 'login';
// add forms
export const ADD_ALBUM_FORM = 'addAlbum';
export const ADD_ARRANGEMENT_FORM = 'addArrangement';
export const ADD_ARTIST_FORM = 'addArtist';
export const ADD_CONCERT_FORM = 'addConcert';
export const ADD_HANGOVER_FORM = 'addHangover';
export const ADD_SEMESTER_FORM = 'addSemester';
export const ADD_TAG_FORM = 'addTag';
// edit forms
export const EDIT_ALBUM_FORM = 'editAlbum';
export const EDIT_ARRANGEMENT_FORM = 'editArrangement';
export const EDIT_ARTIST_FORM = 'editArtist';
export const EDIT_CONCERT_FORM = 'editConcert';
export const EDIT_HANGOVER_FORM = 'editHangover';
export const EDIT_SEMESTER_FORM = 'editSemester';
export const EDIT_TAG_FORM = 'editTag';
export const EDIT_NON_HANGOVER_FORM = 'editNonHangover';

export const SET_BANNER = 'SET_BANNER';
export const BANNER_SUCCESS = 'BANNER_SUCCESS';
export const BANNER_ERROR = 'BANNER_ERROR';
export const CLOSE_BANNER = 'CLOSE_BANNER';
export const TOGGLE_NAVBAR = 'TOGGLE_NAVBAR';
export const INITIALIZE_FORMS = 'INITIALIZE_FORMS';
export const INITIALIZE_FORMS_SUCCESS = 'INITIALIZE_FORMS_SUCCESS';
export const INITIALIZE_FORMS_FAILURE = 'INITIALIZE_FORMS_FAILURE';
export const ARRANGEMENT_SUBMIT = 'ARRANGEMENT_SUBMIT';
export const ARRANGEMENT_SUBMIT_SUCCESS = 'ARRANGEMENT_SUBMIT_SUCCESS';
export const ARRANGEMENT_SUBMIT_FAILURE = 'ARRANGEMENT_SUBMIT_FAILURE';
// full
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
export const GET_TAG = 'GET_TAG';
export const GET_TAG_SUCCESS = 'GET_TAG_SUCCESS';
export const GET_TAG_FAILURE = 'GET_TAG_FAILURE';
export const GET_NON_HANGOVER = 'GET_NON_HANGOVER';
export const GET_NON_HANGOVER_SUCCESS = 'GET_NON_HANGOVER_SUCCESS';
export const GET_NON_HANGOVER_FAILURE = 'GET_NON_HANGOVER_FAILURE';
// edit
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
export const GET_EDIT_TAG = 'GET_EDIT_TAG';
export const GET_EDIT_TAG_SUCCESS = 'GET_EDIT_TAG_SUCCESS';
export const GET_EDIT_TAG_FAILURE = 'GET_EDIT_TAG_FAILURE';
export const GET_EDIT_NON_HANGOVER = 'GET_EDIT_NON_HANGOVER';
export const GET_EDIT_NON_HANGOVER_SUCCESS = 'GET_EDIT_NON_HANGOVER_SUCCESS';
export const GET_EDIT_NON_HANGOVER_FAILURE = 'GET_EDIT_NON_HANGOVER_FAILURE';
// lists
export const GET_HANGOVERS = 'GET_HANGOVERS';
export const GET_HANGOVERS_SUCCESS = 'GET_HANGOVERS_SUCCESS';
export const GET_HANGOVERS_FAILURE = 'GET_HANGOVERS_FAILURE';
export const GET_ARTISTS = 'GET_ARTISTS';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';
export const GET_TAGS = 'GET_TAGS';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';

export function setBanner(text, type) {
  return { type: SET_BANNER, text, bannerType: type };
}

export function closeBanner() {
  return { type: CLOSE_BANNER };
}

export function toggleNavBar() {
  return { type: TOGGLE_NAVBAR };
}

/** Helper action for everything that follows this basic format */
const actionFetch = (endpoint, START, SUCCESS, FAILURE, params) => (dispatch) => {
  dispatch({ type: START });
  return myFetch(`${endpoint}${params ? `?${stringify(params)}` : ''}`)
    .then(data => dispatch({ type: SUCCESS, data }))
    .catch(error => dispatch({ type: FAILURE, error }));
};

export const initializeForms = () => actionFetch('/api/initializeforms', INITIALIZE_FORMS, INITIALIZE_FORMS_SUCCESS, INITIALIZE_FORMS_FAILURE);

/** Auth actions */
export const createAccount = (user) => myFetch('/api/user', {
  method: 'POST',
  body: JSON.stringify(user),
  headers: { 'Content-Type': 'application/json' },
});

export const login = (user) => myFetch('/api/login', {
  method: 'POST',
  body: JSON.stringify(user),
  headers: { 'Content-Type': 'application/json' },
});

export const logout = () => myFetch('/api/logout');

/** Actions for getting full top level objects */
export const getArrangement = arrangementID => actionFetch('/api/full/arrangement', GET_ARRANGEMENT, GET_ARRANGEMENT_SUCCESS, GET_ARRANGEMENT_FAILURE, { arrangementID });
export const getHangover = hangoverID => actionFetch('/api/full/hangover', GET_HANGOVER, GET_HANGOVER_SUCCESS, GET_HANGOVER_FAILURE, { hangoverID });
export const getSemester = semesterID => actionFetch('/api/full/semester', GET_SEMESTER, GET_SEMESTER_SUCCESS, GET_SEMESTER_FAILURE, { semesterID });
export const getConcert = concertID => actionFetch('/api/full/concert', GET_CONCERT, GET_CONCERT_SUCCESS, GET_CONCERT_FAILURE, { concertID });
export const getAlbum = albumID => actionFetch('/api/full/album', GET_ALBUM, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE, { albumID });
export const getArtist = artistID => actionFetch('/api/full/artist', GET_ARTIST, GET_ARTIST_SUCCESS, GET_ARTIST_FAILURE, { artistID });
export const getTag = tagID => actionFetch('/api/full/tag', GET_TAG, GET_TAG_SUCCESS, GET_TAG_FAILURE, { tagID });
export const getNonHangover = nonHangoverID => actionFetch('/api/full/nonhangover', GET_NON_HANGOVER, GET_NON_HANGOVER_SUCCESS, GET_NON_HANGOVER_FAILURE, { nonHangoverID });

/** Actions for getting paged lists */
export const getArrangements = skip => actionFetch('/api/list/arrangements', GET_ARRANGEMENTS, GET_ARRANGEMENTS_SUCCESS, GET_ARRANGEMENTS_FAILURE, { skip });
export const getHangovers = skip => actionFetch('/api/list/hangovers', GET_HANGOVERS, GET_HANGOVERS_SUCCESS, GET_HANGOVERS_FAILURE, { skip });
export const getArtists = skip => actionFetch('/api/list/artists', GET_ARTISTS, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAILURE, { skip });
export const getTags = skip => actionFetch('/api/list/tags', GET_TAGS, GET_TAGS_SUCCESS, GET_TAGS_FAILURE, { skip });

/** Helper action for everything that fetches and adapts data for editing */
const actionFetchEdit = (endpoint, START, SUCCESS, FAILURE, params, adapter) => (dispatch) => {
  dispatch({ type: START });
  return myFetch(`${endpoint}${params ? `?${stringify(params)}` : ''}`)
    .then(data => dispatch({ type: SUCCESS, data: adapter(data) }))
    .catch(error => dispatch({ type: FAILURE, error }));
};

/** Actions for getting and adapting data for edit forms */
export const getEditAlbumData = albumID => actionFetchEdit('/api/full/album', GET_EDIT_ALBUM, GET_EDIT_ALBUM_SUCCESS, GET_EDIT_ALBUM_FAILURE, { albumID }, fullAlbumAdapter);
export const getEditArrangementData = arrangementID => actionFetchEdit('/api/full/arrangement', GET_EDIT_ARRANGEMENT, GET_EDIT_ARRANGEMENT_SUCCESS, GET_EDIT_ARRANGEMENT_FAILURE, { arrangementID }, fullArrangementAdapter);
export const getEditArtistData = artistID => actionFetchEdit('/api/full/artist', GET_EDIT_ARTIST, GET_EDIT_ARTIST_SUCCESS, GET_EDIT_ARTIST_FAILURE, { artistID }, fullArtistAdapter);
export const getEditConcertData = concertID => actionFetchEdit('/api/full/concert', GET_EDIT_CONCERT, GET_EDIT_CONCERT_SUCCESS, GET_EDIT_CONCERT_FAILURE, { concertID }, fullConcertAdapter);
export const getEditHangoverData = hangoverID => actionFetchEdit('/api/full/hangover', GET_EDIT_HANGOVER, GET_EDIT_HANGOVER_SUCCESS, GET_EDIT_HANGOVER_FAILURE, { hangoverID }, fullHangoverAdapter);
export const getEditSemesterData = semesterID => actionFetchEdit('/api/full/semester', GET_EDIT_SEMESTER, GET_EDIT_SEMESTER_SUCCESS, GET_EDIT_SEMESTER_FAILURE, { semesterID }, fullSemesterAdapter);
export const getEditTagData = tagID => actionFetchEdit('/api/full/tag', GET_EDIT_TAG, GET_EDIT_TAG_SUCCESS, GET_EDIT_TAG_FAILURE, { tagID }, fullTagAdapter);
export const getEditNonHangoverData = nonHangoverID => actionFetchEdit('/api/full/nonhangover', GET_EDIT_NON_HANGOVER, GET_EDIT_NON_HANGOVER_SUCCESS, GET_EDIT_NON_HANGOVER_FAILURE, { nonHangoverID }, fullNonHangoverAdapter);

const actionDestroy = (_id, _rev, postPush = '/', endpoint, type, form, reInit) => dispatch =>
  myFetch(`${endpoint}?${stringify({ _id, _rev })}`, { method: 'DELETE' })
    .then(() => {
      dispatch(setBanner(`Successfully deleted ${type}`, BANNER_SUCCESS));
      dispatch(push(postPush));
      dispatch(reset(form));
      if (reInit) {
        dispatch(initializeForms());
      }
    }).catch((e) => {
      dispatch(setBanner(`Failed to delete ${type}`, BANNER_ERROR));
      return e;
    });

/** actions for destroying documents */
export const destroyAlbum = (_id, _rev) => actionDestroy(_id, _rev, '/albums', '/api/destroy/album', 'album', EDIT_ALBUM_FORM, true);
export const destroyArrangement = (_id, _rev) => actionDestroy(_id, _rev, '/', '/api/destroy/arrangement', 'arrangement', EDIT_ARRANGEMENT_FORM);
export const destroyArtist = (_id, _rev) => actionDestroy(_id, _rev, '/artists', '/api/destroy/artist', 'artist', EDIT_ARTIST_FORM);
export const destroyConcert = (_id, _rev) => actionDestroy(_id, _rev, '/concerts', '/api/destroy/concert', 'concert', EDIT_CONCERT_FORM, true);
export const destroyHangover = (_id, _rev) => actionDestroy(_id, _rev, '/hangovers', '/api/destroy/hangover', 'hangover', EDIT_HANGOVER_FORM);
export const destroySemester = (_id, _rev) => actionDestroy(_id, _rev, '/semesters', '/api/destroy/semester', 'semester', EDIT_SEMESTER_FORM, true);
export const destroyTag = (_id, _rev) => actionDestroy(_id, _rev, '/tags', '/api/destroy/tag', 'tag', EDIT_TAG_FORM);
export const destroyNonHangover = (_id, _rev) => actionDestroy(_id, _rev, '/', '/api/destroy/nonhangover', 'non hangover', EDIT_NON_HANGOVER_FORM);

/** Helper action for workflow of creating db objects, handling forms, and setting banner message */
const actionAdd = (values, postPush = '/', endpoint, type, form, reInit) => dispatch =>
  myFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
  }).then((json) => {
    // on success we show a happy message and head back to the home page
    dispatch(setBanner(`Successfully added ${type}`, BANNER_SUCCESS));
    dispatch(push(postPush));
    dispatch(reset(form));
    if (reInit) {
      dispatch(initializeForms());
    }
    return json;
  }).catch((error) => {
    dispatch(setBanner(`Failed to add ${type}`, BANNER_ERROR));
    throw new SubmissionError(error);
  });

  /** Actions for handling edit workflows */
export const addAlbum = v => actionAdd(v, '/albums', '/api/submit/album', 'album', ADD_ALBUM_FORM, true);
export const addArtist = v => actionAdd(v, '/artists', '/api/submit/artist', 'artist', ADD_ARTIST_FORM);
export const addConcert = v => actionAdd(v, '/concerts', '/api/submit/concert', 'concert', ADD_CONCERT_FORM, true);
export const addHangover = v => actionAdd(v, '/hangovers', '/api/submit/hangover', 'hangover', ADD_HANGOVER_FORM);
export const addSemester = v => actionAdd(v, '/semesters', '/api/submit/semester', 'semester', ADD_SEMESTER_FORM, true);
export const addTag = v => actionAdd(v, '/tags', '/api/submit/tag', 'tag', ADD_TAG_FORM);

/** Helper action for workflow of posting edit data, resetting forms, and setting banner message */
const actionEdit = (values, postPush = '/', endpoint, type, form) => dispatch =>
  myFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
  }).then((json) => {
    // on success we show a happy message and head back to the home page
    dispatch(setBanner(`Successfully edited ${type}`, BANNER_SUCCESS));
    dispatch(push(postPush));
    dispatch(reset(form));
    return json;
  }).catch((error) => {
    dispatch(setBanner(`Failed to edit ${type}`, BANNER_ERROR));
    throw new SubmissionError(error);
  });

/** Actions for handling edit workflows */
export const editAlbum = v => actionEdit(v, `/albums/${v._id}`, '/api/submit/album', 'album', EDIT_ALBUM_FORM);
export const editArtist = v => actionEdit(v, `/artists/${v._id}`, '/api/submit/artist', 'artist', EDIT_ARTIST_FORM);
export const editConcert = v => actionEdit(v, `/concerts/${v._id}`, '/api/submit/concert', 'concert', EDIT_CONCERT_FORM);
export const editHangover = v => actionEdit(v, `/hangovers/${v._id}`, '/api/submit/hangover', 'hangover', EDIT_HANGOVER_FORM);
export const editSemester = v => actionEdit(v, `/semesters/${v._id}`, '/api/submit/semester', 'semester', EDIT_SEMESTER_FORM);
export const editTag = v => actionEdit(v, `/tags/${v._id}`, '/api/submit/tag', 'tag', EDIT_TAG_FORM);
export const editNonHangover = v => actionEdit(v, `/nonhangovers/${v._id}`, '/api/submit/nonhangover', 'non hangover', EDIT_NON_HANGOVER_FORM);

export function addArrangement(values) {
  return (dispatch) => {
    dispatch(setBanner('Arrangement submitted. We\'ll let you know when it\'s up. Can take up to a minute depending on file sizes.', BANNER_SUCCESS));
    dispatch(push('/'));
    return submitArrangement(values)
      .then((json) => {
        dispatch(setBanner('Successfully added arrangement', BANNER_SUCCESS));
        dispatch(reset(ADD_ARRANGEMENT_FORM));
        dispatch(getArrangements());
        return json;
      }).catch((e) => {
        dispatch(setBanner('Failed to add arrangement', BANNER_ERROR));
        return e;
      });
  };
}

export function editArrangement(values) {
  return dispatch =>
    submitArrangement(values)
      .then((json) => {
        // on success we show a happy message and head back to the home page
        dispatch(setBanner('Successfully edited arrangement', BANNER_SUCCESS));
        dispatch(push(`/arrangements/${values._id}`));
        dispatch(reset(EDIT_ARRANGEMENT_FORM));
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

function appendFormData(formData, key, value) {
  if (value instanceof File) {
    formData.append(key, value);
  } else if (typeof value === 'object') {
    formData.append(key, JSON.stringify(value));
  } else {
    formData.append(key, value);
  }
}

function formatFormData(values) {
  const formData = new FormData();
  for (const key of Object.keys(values)) {
    if (values[key]) {
      if (Array.isArray(values[key])) {
        for (let i = 0; i < values[key].length; i++) {
          appendFormData(formData, key, values[key][i]);
        }
      } else {
        appendFormData(formData, key, values[key]);
      }
    }
  }
  return formData;
}
