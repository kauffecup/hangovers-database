import {
  GET_ARRANGEMENTS,
  GET_ARRANGEMENTS_SUCCESS,
  GET_ARRANGEMENTS_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  arrangementList: [],
  currentOffset: 0,
  totalRows: 0,
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case GET_ARRANGEMENTS:
      return Object.assign({}, state, {
        loading: true,
      });

    case GET_ARRANGEMENTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        arrangementList: action.data.rows,
        currentOffset: action.data.offset,
        totalRows: action.data.total_rows,
      });

    case GET_ARRANGEMENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });

    default:
      return state;
  }
}
