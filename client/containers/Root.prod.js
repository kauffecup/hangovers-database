import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import MyApp from './App';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <MyApp history={history} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
