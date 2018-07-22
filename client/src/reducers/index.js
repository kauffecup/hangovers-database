import { combineReducers } from 'redux';
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
  nonHangover,
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
  nonHangover,
  // lists
  artists,
  arrangements,
  hangovers,
  tags,
  // edit and submit forms
  form
});
