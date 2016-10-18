import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import app from './app';
import arrangements from './arrangements';

export default combineReducers({
  app,
  arrangements,
  form: formReducer,
  routing: routerReducer,
});
