import {
  INITIALIZE_FORMS,
  INITIALIZE_FORMS_SUCCESS,
  INITIALIZE_FORMS_FAILURE,
} from '../actions';

const initialState = {
  initialLoading: false,
  arrangementTypes: {
    total_rows: 0,
    offset: 0,
    rows: [],
  },
  albumFormats: {
    total_rows: 0,
    offset: 0,
    rows: [],
  },
  qualities: {
    total_rows: 0,
    offset: 0,
    rows: [],
  },
  concertTypes: {
    total_rows: 0,
    offset: 0,
    rows: [],
  },
  semesters: {
    total_rows: 0,
    offset: 0,
    rows: [],
  },
  albums: {
    total_rows: 0,
    offset: 0,
    rows: [],
  },
  concerts: {
    total_rows: 0,
    offset: 0,
    rows: [],
  },
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
        arrangementTypes: Object.assign({}, state.arrangementTypes, action.data.arrangementTypes),
        albumFormats: Object.assign({}, state.albumFormats, action.data.albumFormats),
        qualities: Object.assign({}, state.qualities, action.data.qualities),
        concertTypes: Object.assign({}, state.concertTypes, action.data.concertTypes),
        semesters: Object.assign({}, state.semesters, action.data.semesters),
        albums: Object.assign({}, state.albums, action.data.albums),
        concerts: Object.assign({}, state.concerts, action.data.concerts),
      });

    case INITIALIZE_FORMS_FAILURE:
      return Object.assign({}, state, {
        initialLoading: false,
      });

    default:
      return state;
  }
}
