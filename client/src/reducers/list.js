import {
  GET_ARRANGEMENTS,
  GET_ARRANGEMENTS_SUCCESS,
  GET_ARRANGEMENTS_FAILURE,
  GET_ARTISTS,
  GET_ARTISTS_SUCCESS,
  GET_ARTISTS_FAILURE,
  GET_HANGOVERS,
  GET_HANGOVERS_SUCCESS,
  GET_HANGOVERS_FAILURE,
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

const listReducer = (getConstant, successConstant, failureConstant) =>
  (state = initialState, action) => {
    switch (action.type) {
      case getConstant:
        return {
          ...state,
          loading: true,
        };

      case successConstant: {
        return {
          ...state,
          loading: false,
          list: action.data.offset ? [...state.list, ...action.data.rows] : action.data.rows,
          currentOffset: action.data.offset,
          totalRows: action.data.total_rows,
        };
      }

      case failureConstant:
        return {
          ...state,
          loading: false,
        };

      default:
        return state;
    }
  };

export const arrangements = listReducer(GET_ARRANGEMENTS, GET_ARRANGEMENTS_SUCCESS, GET_ARRANGEMENTS_FAILURE);
export const artists = listReducer(GET_ARTISTS, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAILURE);
export const hangovers = listReducer(GET_HANGOVERS, GET_HANGOVERS_SUCCESS, GET_HANGOVERS_FAILURE);
export const tags = listReducer(GET_TAGS, GET_TAGS_SUCCESS, GET_TAGS_FAILURE);
