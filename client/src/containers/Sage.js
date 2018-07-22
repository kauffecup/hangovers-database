import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { push } from 'connected-react-router'
import { StyleSheet, css } from 'aphrodite';
import { closeBanner, initializeForms, toggleNavBar, logout } from '../actions';
import { BLACK_SQUEEZE, NAVBAR_WIDTH } from '../StyleConstants';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Banner from '../components/Banner';

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

class Sage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initializeForms());
  }

  handleLogout = async () => {
    const { dispatch } = this.props;
    await logout();
    dispatch(push('login'));
  }

  render() {
    const { banner, dispatch, view } = this.props;
    const { open: bannerOpen, text: bannerText, type: bannerType } = banner;
    const { navBarOpen } = view;
    return (
      <div className={css(styles.sage)}>
        <div className={css(styles.notNavBar, !navBarOpen && styles.navBarClosed)}>
          <Header
            navBarOpen={navBarOpen}
            handleHamburger={() => dispatch(toggleNavBar())}
            onLogout={this.handleLogout}
          />
          { bannerOpen ? <Banner text={bannerText} type={bannerType} handleClose={() => dispatch(closeBanner())} /> : null }
          <Switch>
            <Route exact path="/" component={Arrangements} />
            <Route exact path="/arrangements" component={Arrangements} />
            <Route exact path="/arrangements/submit" component={AddArrangement} />
            <Route exact path="/arrangements/edit/:id" component={EditArrangement} />
            <Route exact path="/arrangements/:id" component={Arrangement} />

            <Route exact path="/albums" component={Albums} />
            <Route exact path="/albums/submit" component={AddAlbum} />
            <Route exact path="/albums/edit/:id" component={EditAlbum} />
            <Route exact path="/albums/:id" component={Album} />

            <Route exact path="/artists" component={Artists} />
            <Route exact path="/artists/submit" component={AddArtist} />
            <Route exact path="/artists/edit/:id" component={EditArtist} />
            <Route exact path="/artists/:id" component={Artist} />

            <Route exact path="/concerts" component={Concerts} />
            <Route exact path="/concerts/submit" component={AddConcert} />
            <Route exact path="/concerts/edit/:id" component={EditConcert} />
            <Route exact path="/concerts/:id" component={Concert} />

            <Route exact path="/hangovers" component={Hangovers} />
            <Route exact path="/hangovers/submit" component={AddHangover} />
            <Route exact path="/hangovers/edit/:id" component={EditHangover} />
            <Route exact path="/hangovers/:id" component={Hangover} />

            <Route exact path="/semesters" component={Semesters} />
            <Route exact path="/semesters/submit" component={AddSemester} />
            <Route exact path="/semesters/edit/:id" component={EditSemester} />
            <Route exact path="/semesters/:id" component={Semester} />

            <Route exact path="/tags" component={Tags} />
            <Route exact path="/tags/submit" component={AddTag} />
            <Route exact path="/tags/edit/:id" component={EditTag} />
            <Route exact path="/tags/:id" component={Tag} />

            <Route exact path="/nonhangovers/edit/:id" component={EditNonHangover} />
            <Route exact path="/nonhangovers/:id" component={NonHangover} />
          </Switch>
        </div>
        { navBarOpen ? <NavBar onLogout={this.handleLogout} /> : null }
      </div>
    );
  }
}

const styles = StyleSheet.create({
  sage: {
    background: BLACK_SQUEEZE,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'hidden',
  },
  notNavBar: {
    'padding-left': `${NAVBAR_WIDTH}px`,
    height: '100%',
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
  },
  navBarClosed: {
    'padding-left': 0,
  },
});

Sage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  banner: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

// use the banner state
const mapStateToProps = ({ banner, view }) => ({ banner, view });

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Sage);
