import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from '../containers/Routes';
import DevTools from './DevTools';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <App history={history} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
