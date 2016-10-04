export const ARRANGEMENT_FORM = 'addArrangement';

export const INITIALIZE_FORMS = 'INITIALIZE_FORMS';
export const INITIALIZE_FORMS_SUCCESS = 'INITIALIZE_FORMS_SUCCESS';
export const INITIALIZE_FORMS_FAILURE = 'INITIALIZE_FORMS_FAILURE';
export const ARRANGEMENT_SUBMIT = 'ARRANGEMENT_SUBMIT';
export const ARRANGEMENT_SUBMIT_SUCCESS = 'ARRANGEMENT_SUBMIT_SUCCESS';
export const ARRANGEMENT_SUBMIT_FAILURE = 'ARRANGEMENT_SUBMIT_FAILURE';

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
  return (dispatch) => {
    dispatch({ type: ARRANGEMENT_SUBMIT });
    const formData = new FormData();
    for (const key of Object.keys(values)) {
      formData.append(key, values[key]);
    }
    fetch('/arrangementsubmit', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => dispatch({ type: ARRANGEMENT_SUBMIT_SUCCESS, data }))
      .catch(error => dispatch({ type: ARRANGEMENT_SUBMIT_FAILURE, error }));
  };
}
