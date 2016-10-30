import { stringify } from 'query-string';
import { SubmissionError } from 'redux-form';
import { hangoverAdapter, artistAdapter, fullArrangementAdapter } from '../normalizers/adaptFormData';

export const ARRANGEMENT_FORM = 'addArrangement';

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

export function submitArrangement(values) {
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
  fetch('/arrangementsubmit', { method: 'POST', body: formData })
    .then(response => response.json())
    .catch((error) => {
      throw new SubmissionError(error);
    });
}
