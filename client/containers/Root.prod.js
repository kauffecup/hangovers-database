import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MyApp from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <MyApp history={syncHistoryWithStore(hashHistory, store)} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
