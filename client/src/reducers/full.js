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

export const album = fullReduce('album', c.GET_ALBUM, c.GET_ALBUM_SUCCESS, c.GET_ALBUM_FAILURE);
export const arrangement = fullReduce('arrangement', c.GET_ARRANGEMENT, c.GET_ARRANGEMENT_SUCCESS, c.GET_ARRANGEMENT_FAILURE);
export const artist = fullReduce('artist', c.GET_ARTIST, c.GET_ARTIST_SUCCESS, c.GET_ARTIST_FAILURE);
export const concert = fullReduce('concert', c.GET_CONCERT, c.GET_CONCERT_SUCCESS, c.GET_CONCERT_FAILURE);
export const hangover = fullReduce('hangover', c.GET_HANGOVER, c.GET_HANGOVER_SUCCESS, c.GET_HANGOVER_FAILURE);
export const semester = fullReduce('semester', c.GET_SEMESTER, c.GET_SEMESTER_SUCCESS, c.GET_SEMESTER_FAILURE);
export const tag = fullReduce('tag', c.GET_TAG, c.GET_TAG_SUCCESS, c.GET_TAG_FAILURE);
export const nonHangover = fullReduce('nonHangover', c.GET_NON_HANGOVER, c.GET_NON_HANGOVER_SUCCESS, c.GET_NON_HANGOVER_FAILURE);
