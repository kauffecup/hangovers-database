import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Sage from './Sage';
// auth
import Login from './Login';

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/" component={Sage} />
  </Switch>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
