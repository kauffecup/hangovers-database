import {
  GET_ARTIST,
  GET_ARTIST_SUCCESS,
  GET_ARTIST_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  artist: {},
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_ARTIST:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_ARTIST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        artist: action.data,
      });
    }

    case GET_ARTIST_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
