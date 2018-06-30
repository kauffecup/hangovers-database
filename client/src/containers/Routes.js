import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute } from 'react-router';
import Sage from './Sage';
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
import NonHangover from './full/NonHangover';
// edit
import EditAlbum from './edit/EditAlbum';
import EditArrangement from './edit/EditArrangement';
import EditArtist from './edit/EditArtist';
import EditConcert from './edit/EditConcert';
import EditHangover from './edit/EditHangover';
import EditSemester from './edit/EditSemester';
import EditTag from './edit/EditTag';
import EditNonHangover from './edit/EditNonHangover';
// add
import AddAlbum from './add/AddAlbum';
import AddArrangement from './add/AddArrangement';
import AddArtist from './add/AddArtist';
import AddConcert from './add/AddConcert';
import AddHangover from './add/AddHangover';
import AddSemester from './add/AddSemester';
import AddTag from './add/AddTag';

const App = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Sage}>
      <IndexRoute component={Arrangements} />
      <Route path="arrangements" component={Arrangements} />
      <Route path="arrangements/submit" component={AddArrangement} />
      <Route path="arrangements/edit/:id" component={EditArrangement} />
      <Route path="arrangements/:id" component={Arrangement} />

      <Route path="albums" component={Albums} />
      <Route path="albums/submit" component={AddAlbum} />
      <Route path="albums/edit/:id" component={EditAlbum} />
      <Route path="albums/:id" component={Album} />

      <Route path="artists" component={Artists} />
      <Route path="artists/submit" component={AddArtist} />
      <Route path="artists/edit/:id" component={EditArtist} />
      <Route path="artists/:id" component={Artist} />

      <Route path="concerts" component={Concerts} />
      <Route path="concerts/submit" component={AddConcert} />
      <Route path="concerts/edit/:id" component={EditConcert} />
      <Route path="concerts/:id" component={Concert} />

      <Route path="hangovers" component={Hangovers} />
      <Route path="hangovers/submit" component={AddHangover} />
      <Route path="hangovers/edit/:id" component={EditHangover} />
      <Route path="hangovers/:id" component={Hangover} />

      <Route path="semesters" component={Semesters} />
      <Route path="semesters/submit" component={AddSemester} />
      <Route path="semesters/edit/:id" component={EditSemester} />
      <Route path="semesters/:id" component={Semester} />

      <Route path="tags" component={Tags} />
      <Route path="tags/submit" component={AddTag} />
      <Route path="tags/edit/:id" component={EditTag} />
      <Route path="tags/:id" component={Tag} />

      <Route path="nonhangovers/edit/:id" component={EditNonHangover} />
      <Route path="nonhangovers/:id" component={NonHangover} />
    </Route>
  </Router>;

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;
