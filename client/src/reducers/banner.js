import {
  SET_BANNER,
  BANNER_SUCCESS,
  CLOSE_BANNER,
} from '../actions';

const initialState = {
  open: false,
  text: '',
  type: BANNER_SUCCESS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BANNER:
      return {
        ...state,
        open: true,
        text: action.text,
        type: action.bannerType,
      };

    case CLOSE_BANNER:
      return {
        ...state,
        ...initialState
      };

    default:
      return state;
  }
};
