import { reducer as formReducer } from 'redux-form';
import {
  // form constants
  ALBUM_FORM,
  ARTIST_FORM,
  CONCERT_FORM,
  EDIT_FORM,
  HANGOVER_FORM,
  SEMESTER_FORM,
  TAG_FORM,
  // load actions
  GET_EDIT_ALBUM_SUCCESS,
  GET_EDIT_ARRANGEMENT_SUCCESS,
  GET_EDIT_ARTIST_SUCCESS,
  GET_EDIT_CONCERT_SUCCESS,
  GET_EDIT_HANGOVER_SUCCESS,
  GET_EDIT_SEMESTER_SUCCESS,
  GET_EDIT_TAG_SUCCESS,
} from '../actions';

/** When the form data loads, set the data in our form */
const formReduce = formSuccess => (state, action) => {
  switch (action.type) {
    case formSuccess:
      return Object.assign({}, state, {
        values: action.data,
      });

    default:
      return state;
  }
};

export default formReducer.plugin({
  [ALBUM_FORM]: formReduce(GET_EDIT_ALBUM_SUCCESS),
  [EDIT_FORM]: formReduce(GET_EDIT_ARRANGEMENT_SUCCESS),
  [ARTIST_FORM]: formReduce(GET_EDIT_ARTIST_SUCCESS),
  [CONCERT_FORM]: formReduce(GET_EDIT_CONCERT_SUCCESS),
  [HANGOVER_FORM]: formReduce(GET_EDIT_HANGOVER_SUCCESS),
  [SEMESTER_FORM]: formReduce(GET_EDIT_SEMESTER_SUCCESS),
  [TAG_FORM]: formReduce(GET_EDIT_TAG_SUCCESS),
});
