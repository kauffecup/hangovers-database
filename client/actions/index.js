import { stringify } from 'query-string';
import { reset, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { hangoverAdapter, artistAdapter, fullArrangementAdapter } from '../normalizers/adaptFormData';

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
export const GET_EDIT_ARRANGEMENT = 'GET_EDIT_ARRANGEMENT';
export const GET_EDIT_ARRANGEMENT_SUCCESS = 'GET_EDIT_ARRANGEMENT_SUCCESS';
export const GET_EDIT_ARRANGEMENT_FAILURE = 'GET_EDIT_ARRANGEMENT_FAILURE';

// Here be some network functions. they probably don't belong here because they
// aren't technically actions! howeverrrrr the actions that use network functions
// define them all here so maybe they do? who knows

export function searchHangovers(hangover) {
  if (!hangover) {
    return Promise.resolve({ options: [] });
  }
  return fetch(`/search/hangovers?${stringify({ hangover: hangover.trim() })}`)
    .then(response => response.json())
    .then(hangovers => ({ options: hangovers.map(hangoverAdapter) }));
}

export function searchArtists(artist) {
  if (!artist) {
    return Promise.resolve({ options: [] });
  }
  return fetch(`/search/artists?${stringify({ artist: artist.trim() })}`)
    .then(response => response.json())
    .then(hangovers => ({ options: hangovers.map(artistAdapter) }));
}

export function arrangementExists(name) {
  return fetch(`/arrangementexists?${stringify({ name })}`)
    .then(response => response.json());
}

// OK. here are some actual actions. like with types and whatnot.

export function setBanner(text, type) {
  return { type: SET_BANNER, text, bannerType: type };
}

export function closeBanner() {
  return { type: CLOSE_BANNER };
}

export function initializeForms() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_FORMS });
    fetch('/initializeforms')
      .then(response => response.json())
      .then(data => dispatch({ type: INITIALIZE_FORMS_SUCCESS, data }))
      .catch(error => dispatch({ type: INITIALIZE_FORMS_FAILURE, error }));
  };
}

export function getArrangement(arrangementID) {
  return (dispatch) => {
    dispatch({ type: GET_ARRANGEMENT });
    fetch(`/fullarrangement?${stringify({ arrangementID })}`)
      .then(response => response.json())
      .then(data => dispatch({ type: GET_ARRANGEMENT_SUCCESS, data }))
      .catch(error => dispatch({ type: GET_ARRANGEMENT_FAILURE, error }));
  };
}

export function getEditArrangementData(arrangementID) {
  return (dispatch) => {
    dispatch({ type: GET_EDIT_ARRANGEMENT });
    fetch(`/fullarrangement?${stringify({ arrangementID })}`)
      .then(response => response.json())
      .then(data => dispatch({ type: GET_EDIT_ARRANGEMENT_SUCCESS, data: fullArrangementAdapter(data) }))
      .catch(error => dispatch({ type: GET_EDIT_ARRANGEMENT_FAILURE, error }));
  };
}

export function getArrangements(skip) {
  return (dispatch) => {
    dispatch({ type: GET_ARRANGEMENTS });
    fetch(`/arrangements?${stringify({ skip })}`)
      .then(response => response.json())
      .then(data => dispatch({ type: GET_ARRANGEMENTS_SUCCESS, data }))
      .catch(error => dispatch({ type: GET_ARRANGEMENTS_FAILURE, error }));
  };
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
  return fetch('/arrangementsubmit', { method: 'POST', body: formData })
    .then(response => response.json())
    .catch((error) => {
      throw new SubmissionError(error);
    });
}
