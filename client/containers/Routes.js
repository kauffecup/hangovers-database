import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Sage from './Sage';
import AddArrangement from './AddArrangement';
// lists
import Albums from './lists/Albums';
import Arrangements from './lists/Arrangements';
import Artists from './lists/Artists';
import Concerts from './lists/Concerts';
import Hangovers from './lists/Hangovers';
import Semesters from './lists/Semesters';
import Tags from './lists/Tags';
// full
import Album from './full/Album';
import Arrangement from './full/Arrangement';
import Artist from './full/Artist';
import Concert from './full/Concert';
import Hangover from './full/Hangover';
import Semester from './full/Semester';
import Tag from './full/Tag';
// edit
import EditAlbum from './edit/EditAlbum';
import EditArrangement from './edit/EditArrangement';
import EditArtist from './edit/EditArtist';
import EditConcert from './edit/EditConcert';
import EditHangover from './edit/EditHangover';
import EditSemester from './edit/EditSemester';

const App = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Sage}>
      <IndexRoute component={Arrangements} />
      <Route path="submitform" component={AddArrangement} />
      <Route path="arrangement/:id" component={Arrangement} />
      <Route path="edit/arrangement/:id" component={EditArrangement} />

      <Route path="albums" component={Albums} />
      <Route path="albums/:id" component={Album} />
      <Route path="edit/album/:id" component={EditAlbum} />

      <Route path="artists" component={Artists} />
      <Route path="artists/:id" component={Artist} />
      <Route path="edit/artist/:id" component={EditArtist} />

      <Route path="concerts" component={Concerts} />
      <Route path="concerts/:id" component={Concert} />
      <Route path="edit/concert/:id" component={EditConcert} />

      <Route path="hangovers" component={Hangovers} />
      <Route path="hangovers/:id" component={Hangover} />
      <Route path="edit/hangover/:id" component={EditHangover} />

      <Route path="semesters" component={Semesters} />
      <Route path="semesters/:id" component={Semester} />
      <Route path="edit/semester/:id" component={EditSemester} />

      <Route path="tags" component={Tags} />
      <Route path="tags/:id" component={Tag} />
    </Route>
  </Router>;

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
