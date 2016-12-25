import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import artists from './artists';
import arrangements from './arrangements';
import banner from './banner';
import hangovers from './hangovers';
import tags from './tags';
import form from './form';
import {
  album,
  artist,
  arrangement,
  concert,
  hangover,
  semester,
  tag,
} from './full';

export default combineReducers({
  app,
  banner,
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
