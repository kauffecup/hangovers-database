import { reducer as formReducer } from 'redux-form';
import {
  // form constants
  EDIT_ALBUM_FORM, EDIT_ARTIST_FORM, EDIT_CONCERT_FORM, EDIT_ARRANGEMENT_FORM, EDIT_HANGOVER_FORM, EDIT_SEMESTER_FORM, EDIT_TAG_FORM,
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
  [EDIT_ALBUM_FORM]: formReduce(GET_EDIT_ALBUM, GET_EDIT_ALBUM_SUCCESS, GET_EDIT_ALBUM_FAILURE),
  [EDIT_ARRANGEMENT_FORM]: formReduce(GET_EDIT_ARRANGEMENT, GET_EDIT_ARRANGEMENT_SUCCESS, GET_EDIT_ARRANGEMENT_FAILURE),
  [EDIT_ARTIST_FORM]: formReduce(GET_EDIT_ARTIST, GET_EDIT_ARTIST_SUCCESS, GET_EDIT_ARTIST_FAILURE),
  [EDIT_CONCERT_FORM]: formReduce(GET_EDIT_CONCERT, GET_EDIT_CONCERT_SUCCESS, GET_EDIT_CONCERT_FAILURE),
  [EDIT_HANGOVER_FORM]: formReduce(GET_EDIT_HANGOVER, GET_EDIT_HANGOVER_SUCCESS, GET_EDIT_HANGOVER_FAILURE),
  [EDIT_SEMESTER_FORM]: formReduce(GET_EDIT_SEMESTER, GET_EDIT_SEMESTER_SUCCESS, GET_EDIT_SEMESTER_FAILURE),
  [EDIT_TAG_FORM]: formReduce(GET_EDIT_TAG, GET_EDIT_TAG_SUCCESS, GET_EDIT_TAG_FAILURE),
});
