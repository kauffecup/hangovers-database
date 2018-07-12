import {
  TOGGLE_NAVBAR,
} from '../actions';

const initialState = {
  navBarOpen: true,
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        navBarOpen: !state.navBarOpen,
      };

    default:
      return state;
  }
}
