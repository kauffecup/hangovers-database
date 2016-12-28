import { reducer as formReducer } from 'redux-form';
import {
  // form constants
  ALBUM_FORM, ARTIST_FORM, CONCERT_FORM, EDIT_FORM, HANGOVER_FORM, SEMESTER_FORM, TAG_FORM,
  // load action begin constants
  GET_EDIT_ALBUM, GET_EDIT_ARRANGEMENT, GET_EDIT_ARTIST, GET_EDIT_CONCERT, GET_EDIT_HANGOVER, GET_EDIT_SEMESTER, GET_EDIT_TAG,
  // load actions success constants
  GET_EDIT_ALBUM_SUCCESS, GET_EDIT_ARRANGEMENT_SUCCESS, GET_EDIT_ARTIST_SUCCESS, GET_EDIT_CONCERT_SUCCESS, GET_EDIT_HANGOVER_SUCCESS, GET_EDIT_SEMESTER_SUCCESS, GET_EDIT_TAG_SUCCESS,
  // load action error constants
  GET_EDIT_ALBUM_FAILURE, GET_EDIT_ARRANGEMENT_FAILURE, GET_EDIT_ARTIST_FAILURE, GET_EDIT_CONCERT_FAILURE, GET_EDIT_HANGOVER_FAILURE, GET_EDIT_SEMESTER_FAILURE, GET_EDIT_TAG_FAILURE,
} from '../actions';

/** When the form data loads, set the data in our form */
const formReduce = (formStart, formSuccess, formFailure) => (state, action) => {
  switch (action.type) {
    case formStart:
      return Object.assign({}, state, {
        loading: true,
      });

    case formSuccess:
      return Object.assign({}, state, {
        values: action.data,
        loading: false,
      });

    case formFailure:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
};

export default formReducer.plugin({
  [ALBUM_FORM]: formReduce(GET_EDIT_ALBUM, GET_EDIT_ALBUM_SUCCESS, GET_EDIT_ALBUM_FAILURE),
  [EDIT_FORM]: formReduce(GET_EDIT_ARRANGEMENT, GET_EDIT_ARRANGEMENT_SUCCESS, GET_EDIT_ARRANGEMENT_FAILURE),
  [ARTIST_FORM]: formReduce(GET_EDIT_ARTIST, GET_EDIT_ARTIST_SUCCESS, GET_EDIT_ARTIST_FAILURE),
  [CONCERT_FORM]: formReduce(GET_EDIT_CONCERT, GET_EDIT_CONCERT_SUCCESS, GET_EDIT_CONCERT_FAILURE),
  [HANGOVER_FORM]: formReduce(GET_EDIT_HANGOVER, GET_EDIT_HANGOVER_SUCCESS, GET_EDIT_HANGOVER_FAILURE),
  [SEMESTER_FORM]: formReduce(GET_EDIT_SEMESTER, GET_EDIT_SEMESTER_SUCCESS, GET_EDIT_SEMESTER_FAILURE),
  [TAG_FORM]: formReduce(GET_EDIT_TAG, GET_EDIT_TAG_SUCCESS, GET_EDIT_TAG_FAILURE),
});
