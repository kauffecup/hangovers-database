import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import AddArrangement from './AddArrangement';
import EditArrangement from './EditArrangement';
import Arrangements from './Arrangements';
import Arrangement from './Arrangement';
import Sage from './Sage';
import Hangovers from './Hangovers';
import Semesters from './Semesters';
import Concerts from './Concerts';

const App = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Sage}>
      <IndexRoute component={Arrangements} />
      <Route path="hangovers" component={Hangovers} />
      <Route path="semesters" component={Semesters} />
      <Route path="concerts" component={Concerts} />
      <Route path="submitform" component={AddArrangement} />
      <Route path="edit/:id" component={EditArrangement} />
      <Route path="arrangement/:id" component={Arrangement} />
    </Route>
  </Router>;

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
