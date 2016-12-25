import {
  GET_ALBUM,
  GET_ALBUM_SUCCESS,
  GET_ALBUM_FAILURE,
  GET_ARRANGEMENT,
  GET_ARRANGEMENT_SUCCESS,
  GET_ARRANGEMENT_FAILURE,
  GET_ARTIST,
  GET_ARTIST_SUCCESS,
  GET_ARTIST_FAILURE,
  GET_CONCERT,
  GET_CONCERT_SUCCESS,
  GET_CONCERT_FAILURE,
  GET_HANGOVER,
  GET_HANGOVER_SUCCESS,
  GET_HANGOVER_FAILURE,
  GET_SEMESTER,
  GET_SEMESTER_SUCCESS,
  GET_SEMESTER_FAILURE,
  GET_TAG,
  GET_TAG_SUCCESS,
  GET_TAG_FAILURE,
} from '../actions';

/** When the full data loads, set the appropriate field in the state object */
const fullReduce = (docField, getConstant, successConstant, failureConstant) => {
  const initialState = {
    loading: false,
    [docField]: {},
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case getConstant:
        return Object.assign({}, state, {
          loading: true,
        });

      case successConstant: {
        return Object.assign({}, state, {
          loading: false,
          [docField]: action.data,
        });
      }

      case failureConstant:
        return Object.assign({}, state, {
          loading: false,
        });

      default:
        return state;
    }
  };
};

module.exports.album = fullReduce('album', GET_ALBUM, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE);
module.exports.arrangement = fullReduce('arrangement', GET_ARRANGEMENT, GET_ARRANGEMENT_SUCCESS, GET_ARRANGEMENT_FAILURE);
module.exports.artist = fullReduce('artist', GET_ARTIST, GET_ARTIST_SUCCESS, GET_ARTIST_FAILURE);
module.exports.concert = fullReduce('concert', GET_CONCERT, GET_CONCERT_SUCCESS, GET_CONCERT_FAILURE);
module.exports.hangover = fullReduce('hangover', GET_HANGOVER, GET_HANGOVER_SUCCESS, GET_HANGOVER_FAILURE);
module.exports.semester = fullReduce('semester', GET_SEMESTER, GET_SEMESTER_SUCCESS, GET_SEMESTER_FAILURE);
module.exports.tag = fullReduce('tag', GET_TAG, GET_TAG_SUCCESS, GET_TAG_FAILURE);
