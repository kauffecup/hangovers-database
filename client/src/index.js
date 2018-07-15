import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import store, { history } from './store';
import App from './containers/Routes';

// load our css. there probably is a better way to do this
// but for now this is our move
require('./style.css');
require('react-select/dist/react-select.css');

const rootElement = document.getElementById('root');

render((
  <Provider store={store}>
    <App history={syncHistoryWithStore(history, store)} />
  </Provider>
), rootElement);
