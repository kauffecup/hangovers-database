import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import app from './app';
import album from './album';
import artist from './artist';
import artists from './artists';
import arrangement from './arrangement';
import arrangements from './arrangements';
import banner from './banner';
import concert from './concert';
import hangover from './hangover';
import hangovers from './hangovers';
import semester from './semester';
import { GET_EDIT_ARRANGEMENT_SUCCESS } from '../actions';

export default combineReducers({
  app,
  album,
  artist,
  artists,
  arrangement,
  arrangements,
  banner,
  concert,
  hangover,
  hangovers,
  semester,
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
