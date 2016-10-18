import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import MyApp from './App';
import DevTools from './DevTools';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <MyApp history={history} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
