import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import history from './history';
import SageApp from '../reducers';
import DevTools from '../containers/DevTools';

// create a store that has redux-thunk middleware, and dev tooling enabled.
// the logger middleware logs the previous state, the action, and the next
// state in the browser's console for easy debuggin' and instrementing the
// dev tools allows for us to commit different actions and go forwards and
// backwards in time using magic
const createDevStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(history)),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore);

export default function configureStore() {
  const store = createDevStoreWithMiddleware(SageApp);

  // enable webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
