import {
  GET_TAG,
  GET_TAG_SUCCESS,
  GET_TAG_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  tag: {},
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_TAG:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_TAG_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        tag: action.data,
      });
    }

    case GET_TAG_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
