import {
  GET_SEMESTER,
  GET_SEMESTER_SUCCESS,
  GET_SEMESTER_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  semester: {},
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_SEMESTER:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_SEMESTER_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        semester: action.data,
      });
    }

    case GET_SEMESTER_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
