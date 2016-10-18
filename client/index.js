import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './bootstrap/Root';
import configureStore from './bootstrap/configureStore';
import history from './bootstrap/history';

// load our css. there probably is a better way to do this
// but for now this is our move
require('./style.less');
require('react-select/dist/react-select.css');

const store = configureStore();
const rootElement = document.getElementById('root');

render(<Root store={store} history={syncHistoryWithStore(history, store)} />, rootElement);
