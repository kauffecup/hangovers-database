import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import AddArrangementForm from './AddArrangementForm';
import Sage from './Sage';

const App = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Sage}>
      <Route path="submitform" component={AddArrangementForm} />
    </Route>
  </Router>;

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
