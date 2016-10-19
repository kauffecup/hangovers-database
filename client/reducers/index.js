import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import app from './app';
import arrangement from './arrangement';
import arrangements from './arrangements';

export default combineReducers({
  app,
  arrangement,
  arrangements,
  form: formReducer,
  routing: routerReducer,
});
