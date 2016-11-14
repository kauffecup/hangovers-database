import {
  GET_CONCERT,
  GET_CONCERT_SUCCESS,
  GET_CONCERT_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  concert: {},
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_CONCERT:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_CONCERT_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        concert: action.data,
      });
    }

    case GET_CONCERT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
