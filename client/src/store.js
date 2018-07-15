import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import reducer from './reducers';

let composeEnhancers = compose;

const middleware = [
  thunk,
  routerMiddleware(browserHistory)
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

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(...middleware)
));

export const history = browserHistory;
export default store;
