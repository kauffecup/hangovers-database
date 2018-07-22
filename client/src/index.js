import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store';
import App from './containers/Routes';

// load our css. there probably is a better way to do this
// but for now this is our move
require('./style.css');
require('react-select/dist/react-select.css');

const rootElement = document.getElementById('root');

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), rootElement);
