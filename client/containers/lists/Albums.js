import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AlbumLink from '../../components/links/AlbumLink';
import List from '../../components/pages/List';

const Albums = ({ albums }) =>
  <List
    list={albums}
    ChildComponent={AlbumLink}
  />;

Albums.propTypes = {
  albums: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  albums: state.app.albums,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Albums);
