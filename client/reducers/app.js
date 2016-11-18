import {
  INITIALIZE_FORMS,
  INITIALIZE_FORMS_SUCCESS,
  INITIALIZE_FORMS_FAILURE,
} from '../actions';

const initialState = {
  initialLoading: false,
  arrangementTypes: [],
  albumFormats: [],
  concertTypes: [],
  semesters: [],
  semesterMap: {},
  albums: [],
  concerts: [],
  genres: [],
  keys: [],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_FORMS:
      return Object.assign({}, state, {
        initialLoading: true,
      });

    case INITIALIZE_FORMS_SUCCESS: {
      const sMap = {};
      for (const semester of action.data.semesters.rows) {
        sMap[semester._id] = semester;
      }
      return Object.assign({}, state, {
        initialLoading: false,
        arrangementTypes: action.data.arrangementTypes.rows,
        albumFormats: action.data.albumFormats.rows,
        concertTypes: action.data.concertTypes.rows,
        semesters: action.data.semesters.rows,
        semesterMap: sMap,
        albums: action.data.albums.rows,
        concerts: action.data.concerts.rows,
        genres: action.data.genres.rows,
        keys: action.data.keys.rows,
      });
    }

    case INITIALIZE_FORMS_FAILURE:
      return Object.assign({}, state, {
        initialLoading: false,
      });

    default:
      return state;
  }
}
