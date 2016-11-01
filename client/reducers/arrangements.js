import {
  GET_ARRANGEMENTS,
  GET_ARRANGEMENTS_SUCCESS,
  GET_ARRANGEMENTS_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  list: [],
  currentOffset: 0,
  totalRows: 0,
  arrangementMap: {},
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_ARRANGEMENTS:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_ARRANGEMENTS_SUCCESS: {
      const am = {};
      for (const arrangement of action.data.rows) {
        am[arrangement._id] = arrangement;
      }
      return Object.assign({}, state, {
        loading: false,
        list: action.data.offset ? [...state.list, ...action.data.rows] : action.data.rows,
        currentOffset: action.data.offset,
        totalRows: action.data.total_rows,
        arrangementMap: Object.assign({}, state.arrangementMap, am),
      });
    }

    case GET_ARRANGEMENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
