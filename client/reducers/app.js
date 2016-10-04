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
      });

    case INITIALIZE_FORMS_FAILURE:
      return Object.assign({}, state, {
        initialLoading: false,
      });

    default:
      return state;
  }
}
