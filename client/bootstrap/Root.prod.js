import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from '../containers/App';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
