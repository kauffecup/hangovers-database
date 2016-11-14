import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import AddArrangement from './AddArrangement';
import EditArrangement from './EditArrangement';
import Arrangements from './Arrangements';
import Arrangement from './Arrangement';
import Artists from './Artists';
import Album from './Album';
import Albums from './Albums';
import Sage from './Sage';
import Hangover from './Hangover';
import Hangovers from './Hangovers';
import Semester from './Semester';
import Semesters from './Semesters';
import Concert from './Concert';
import Concerts from './Concerts';

const App = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Sage}>
      <IndexRoute component={Arrangements} />
      <Route path="hangovers" component={Hangovers} />
      <Route path="hangovers/:id" component={Hangover} />
      <Route path="semesters" component={Semesters} />
      <Route path="semesters/:id" component={Semester} />
      <Route path="concerts" component={Concerts} />
      <Route path="concerts/:id" component={Concert} />
      <Route path="albums" component={Albums} />
      <Route path="albums/:id" component={Album} />
      <Route path="artists" component={Artists} />
      <Route path="submitform" component={AddArrangement} />
      <Route path="edit/:id" component={EditArrangement} />
      <Route path="arrangement/:id" component={Arrangement} />
    </Route>
  </Router>;

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
