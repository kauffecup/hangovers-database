import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import app from './app';
import artists from './artists';
import arrangement from './arrangement';
import arrangements from './arrangements';
import banner from './banner';
import hangover from './hangover';
import hangovers from './hangovers';
import { GET_EDIT_ARRANGEMENT_SUCCESS } from '../actions';

export default combineReducers({
  app,
  artists,
  arrangement,
  arrangements,
  banner,
  hangover,
  hangovers,
  routing: routerReducer,
  form: formReducer.plugin({
    editArrangement: (state, action) => {
      switch (action.type) {
        case GET_EDIT_ARRANGEMENT_SUCCESS:
          return Object.assign({}, state, {
            values: action.data,
          });

        default:
          return state;
      }
    },
  }),
});
