import {
  GET_HANGOVER,
  GET_HANGOVER_SUCCESS,
  GET_HANGOVER_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  hangover: {},
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_HANGOVER:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_HANGOVER_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        hangover: action.data,
      });
    }

    case GET_HANGOVER_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
