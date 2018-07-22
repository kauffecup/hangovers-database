import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import reducer from './reducers';

let composeEnhancers = compose;

export const history = createBrowserHistory();

const middleware = [
  thunk,
  routerMiddleware(history)
];

if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger');

  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  middleware.push(createLogger({
    duration: true,
    collapsed: true,
    logger: {
      ...console,
      groupCollapsed(title, ...format) {
        console.groupCollapsed('%c [Sage]' + title, 'color: #27ae60; font-weight: lighter;', ...format);
      }
    }
  }));
}

const store = createStore(
  connectRouter(history)(reducer),
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

export default store;
