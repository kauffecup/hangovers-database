import {
  INITIALIZE_FORMS,
  INITIALIZE_FORMS_SUCCESS,
  INITIALIZE_FORMS_FAILURE,
} from '../actions';

const initialState = {
  initialLoading: false,
  arrangementTypes: [],
  albumFormats: [],
  qualities: [],
  concertTypes: [],
  semesters: [],
  albums: [],
  concerts: [],
  genres: [],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_FORMS:
      return Object.assign({}, state, {
        initialLoading: true,
      });

    case INITIALIZE_FORMS_SUCCESS:
      return Object.assign({}, state, {
        initialLoading: false,
        arrangementTypes: action.data.arrangementTypes.rows,
        albumFormats: action.data.albumFormats.rows,
        qualities: action.data.qualities.rows,
        concertTypes: action.data.concertTypes.rows,
        semesters: action.data.semesters.rows,
        albums: action.data.albums.rows,
        concerts: action.data.concerts.rows,
        genres: action.data.genres.rows,
      });

    case INITIALIZE_FORMS_FAILURE:
      return Object.assign({}, state, {
        initialLoading: false,
      });

    default:
      return state;
  }
}
