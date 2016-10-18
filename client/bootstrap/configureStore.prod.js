import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import history from './history';
import SageApp from '../reducers';

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  routerMiddleware(history),
)(createStore);

export default function configureStore() {
  return createStoreWithMiddleware(SageApp);
}
