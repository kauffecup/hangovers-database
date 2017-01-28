import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import banner from './banner';
import form from './form';
import view from './view';
import {
  album,
  artist,
  arrangement,
  concert,
  hangover,
  semester,
  tag,
} from './full';
import {
  artists,
  arrangements,
  hangovers,
  tags,
} from './list';

export default combineReducers({
  app,
  banner,
  view,
  // full pages
  album,
  artist,
  arrangement,
  concert,
  hangover,
  semester,
  tag,
  // lists
  artists,
  arrangements,
  hangovers,
  tags,
  // edit and submit forms
  form,
  // routing
  routing: routerReducer,
});
