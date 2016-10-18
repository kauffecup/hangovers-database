import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import AddArrangementForm from './AddArrangementForm';
import ArrangementList from './ArrangementList';
import Arrangement from './Arrangement';
import Sage from './Sage';

const App = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Sage}>
      <IndexRoute component={ArrangementList} />
      <Route path="submitform" component={AddArrangementForm} />
      <Route path="arrangement/:id" component={Arrangement} />
    </Route>
  </Router>;

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
