import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

// load our css. there probably is a better way to do this
// but for now this is our move
require('./style.less');
require('react-select/dist/react-select.css');

const store = configureStore();
const rootElement = document.getElementById('root');

render(<Root store={store} />, rootElement);
