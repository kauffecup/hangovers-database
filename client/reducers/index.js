import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import app from './app';

export default combineReducers({
  app,
  form: formReducer,
  routing: routerReducer,
});
