import {
  GET_ALBUM,
  GET_ALBUM_SUCCESS,
  GET_ALBUM_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  album: {},
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_ALBUM:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_ALBUM_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        album: action.data,
      });
    }

    case GET_ALBUM_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
