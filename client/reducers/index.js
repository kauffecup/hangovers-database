import { combineReducers } from 'redux';
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
import tag from './tag';
import tags from './tags';
import form from './form';

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
  tag,
  tags,
  form,
  routing: routerReducer,
});
