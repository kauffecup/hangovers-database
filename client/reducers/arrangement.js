import {
  GET_ARRANGEMENT,
  GET_ARRANGEMENT_SUCCESS,
  GET_ARRANGEMENT_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  arrangement: {},
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_ARRANGEMENT:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_ARRANGEMENT_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        arrangement: action.data,
      });
    }

    case GET_ARRANGEMENT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
