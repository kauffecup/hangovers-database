import {
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  list: [],
  currentOffset: 0,
  totalRows: 0,
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_TAGS:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_TAGS_SUCCESS: {
      const am = {};
      for (const arrangement of action.data.rows) {
        am[arrangement._id] = arrangement;
      }
      return Object.assign({}, state, {
        loading: false,
        list: action.data.offset ? [...state.list, ...action.data.rows] : action.data.rows,
        currentOffset: action.data.offset,
        totalRows: action.data.total_rows,
      });
    }

    case GET_TAGS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
