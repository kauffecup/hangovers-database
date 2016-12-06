import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { stringify } from 'query-string';
import { getArrangement } from '../actions';
import PathButton from '../components/PathButton';
import AlbumList from '../components/lists/AlbumList';
import ArtistList from '../components/lists/ArtistList';
import ConcertList from '../components/lists/ConcertList';
import HangoverList from '../components/lists/HangoverList';
import SemesterList from '../components/lists/SemesterList';
import { keyFormatter } from '../normalizers/adaptFormData';
import { PADDING_UNIT } from '../StyleConstants';

const Field = ({ title, text,  }) => typeof text === 'string' ? // eslint-disable-line
  <div>
    { typeof title === 'string' ? <span>{title}</span> : null }
    { typeof text === 'string' ? <span>{text}</span> : null }
  </div>
: null;

class Arrangement extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getArrangement(id));
  }

  render() {
    const { arrangement, loading, id } = this.props;
    if (loading) {
      return <div>loading</div>;
    }
    return (
      <div className={css(styles.arrangement)}>
        <PathButton text="edit" path={`/edit/${id}`} />
        <h2>{arrangement.name}</h2>
        <h3>Song</h3>
        <Field text={arrangement.alternateName} />
        <ArtistList title="originally performed by" artists={arrangement.originalArtists} />
        <Field text={arrangement.genre && arrangement.genre.length && arrangement.genre.map(g => g.name).join(', ')} />
        <Field text={arrangement.whenWritten} />
        <h3>Arrangement</h3>
        <HangoverList title="arranged by" hangovers={arrangement.arrangers} />
        <Field text={keyFormatter(arrangement.key)} />
        <SemesterList title="arranged" semesters={[arrangement.whenArranged]} />
        <Field text={arrangement.syllables ? 'has syllables' : 'doesn\'t have syllables'} />
        <Field text={arrangement.arrangementType && arrangement.arrangementType.name} />
        <h3>Performances</h3>
        <Field text={arrangement.active ? 'active' : 'not active'} />
        <SemesterList title="semester(s) performed" semesters={arrangement.whenPerformed} />
        <ConcertList title="concert(s) performed" concerts={arrangement.concerts} />
        <AlbumList title="album(s) on" albums={arrangement.albums} />
        <HangoverList title="soloist(s)" hangovers={arrangement.soloists} />
        <h3>Files and Such</h3>
        {arrangement._attachments ? Object.keys(arrangement._attachments).map(aid =>
          <a
            href={`/arrangementfile?${stringify({
              arrangementID: id,
              attachmentID: aid,
              type: arrangement._attachments[aid].content_type,
            })}`}
            download
          >
            {`download ${aid}`}
          </a>
        ) : null}
        <Field title="Youtube Link" text={arrangement.youtube} />
        <Field title="Spotify Link (Original Song)" text={arrangement.spotifyOriginalLink} />
        <Field title="Spotify Link (Hangovers Version)" text={arrangement.spotifyHangoverLink} />
        <h3>Odds and Ends</h3>
        <Field title="Tags" text={arrangement.tags && arrangement.tags.length ? arrangement.tags.map(tag => tag.name).join(', ') : 'none!'} />
        <Field title="Notes" text={arrangement.notes} />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  arrangement: {
    flex: 1,
    'overflow-y': 'auto',
    padding: `${PADDING_UNIT}px`,
  },
});

Arrangement.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  arrangement: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the arrangement state
const mapStateToProps = (state, routerProps) => ({
  loading: state.arrangement.loading,
  arrangement: state.arrangement.arrangement,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Arrangement);
