import { stringify } from 'query-string';
import { SubmissionError } from 'redux-form';
import { hangoverAdapter, artistAdapter } from '../normalizers/adaptFormData';

export const ARRANGEMENT_FORM = 'addArrangement';

export const INITIALIZE_FORMS = 'INITIALIZE_FORMS';
export const INITIALIZE_FORMS_SUCCESS = 'INITIALIZE_FORMS_SUCCESS';
export const INITIALIZE_FORMS_FAILURE = 'INITIALIZE_FORMS_FAILURE';
export const ARRANGEMENT_SUBMIT = 'ARRANGEMENT_SUBMIT';
export const ARRANGEMENT_SUBMIT_SUCCESS = 'ARRANGEMENT_SUBMIT_SUCCESS';
export const ARRANGEMENT_SUBMIT_FAILURE = 'ARRANGEMENT_SUBMIT_FAILURE';

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
