import * as c from '../actions';

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

module.exports.album = fullReduce('album', c.GET_ALBUM, c.GET_ALBUM_SUCCESS, c.GET_ALBUM_FAILURE);
module.exports.arrangement = fullReduce('arrangement', c.GET_ARRANGEMENT, c.GET_ARRANGEMENT_SUCCESS, c.GET_ARRANGEMENT_FAILURE);
module.exports.artist = fullReduce('artist', c.GET_ARTIST, c.GET_ARTIST_SUCCESS, c.GET_ARTIST_FAILURE);
module.exports.concert = fullReduce('concert', c.GET_CONCERT, c.GET_CONCERT_SUCCESS, c.GET_CONCERT_FAILURE);
module.exports.hangover = fullReduce('hangover', c.GET_HANGOVER, c.GET_HANGOVER_SUCCESS, c.GET_HANGOVER_FAILURE);
module.exports.semester = fullReduce('semester', c.GET_SEMESTER, c.GET_SEMESTER_SUCCESS, c.GET_SEMESTER_FAILURE);
module.exports.tag = fullReduce('tag', c.GET_TAG, c.GET_TAG_SUCCESS, c.GET_TAG_FAILURE);
module.exports.nonHangover = fullReduce('nonHangover', c.GET_NON_HANGOVER, c.GET_NON_HANGOVER_SUCCESS, c.GET_NON_HANGOVER_FAILURE);
