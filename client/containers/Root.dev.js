import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MyApp from './App';
import DevTools from './DevTools';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <MyApp history={syncHistoryWithStore(browserHistory, store)} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
