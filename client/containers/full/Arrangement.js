import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'query-string';
import { getArrangement } from '../../actions';
import AlbumList from '../../components/lists/AlbumList';
import ArtistList from '../../components/lists/ArtistList';
import ConcertList from '../../components/lists/ConcertList';
import HangoverList from '../../components/lists/HangoverList';
import SemesterList from '../../components/lists/SemesterList';
import TagList from '../../components/lists/TagList';
import { keyFormatter, arrangementFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';
import DisplayField from '../../components/DisplayField';

const Arrangement = ({ dispatch, id, arrangement, loading }) =>
  <Full
    title={arrangementFormatter(arrangement)}
    load={() => dispatch(getArrangement(id))}
    path={`/edit/arrangement/${id}`}
    loading={loading}
  >
    <h3>Song</h3>
    <ArtistList title="originally performed by" artists={arrangement.artists} />
    <DisplayField title="genre(s)" text={arrangement.genre && arrangement.genre.length && arrangement.genre.map(g => g.name).join(', ')} />
    <DisplayField title="released" text={arrangement.whenWritten} />
    <h3>Arrangement</h3>
    <HangoverList title="arranged by" hangovers={arrangement.arrangers} />
    <DisplayField text={keyFormatter(arrangement.key)} />
    <SemesterList title="arranged" semesters={[arrangement.semesterArranged]} />
    <DisplayField text={arrangement.syllables ? 'has syllables' : 'doesn\'t have syllables'} />
    <DisplayField text={arrangement.arrangementType && arrangement.arrangementType.name} />
    <h3>Performance</h3>
    <DisplayField text={arrangement.active ? 'active' : 'not active'} />
    <SemesterList title="semester(s) performed" semesters={arrangement.semestersPerformed} />
    <ConcertList title="concert(s) performed" concerts={arrangement.concerts} />
    <AlbumList title="album(s) on" albums={arrangement.albums} />
    <HangoverList title="soloist(s)" hangovers={arrangement.soloists} />
    <h3>Files and Such</h3>
    {arrangement._attachments ? Object.keys(arrangement._attachments).map(aid =>
      <div><a
        href={`/api/arrangementfile?${stringify({
          arrangementID: id,
          attachmentID: aid,
          type: arrangement._attachments[aid].content_type,
        })}`}
        download
      >
        {`download ${aid}`}
      </a></div>
    ) : null}
    <DisplayField title="Youtube Link" text={arrangement.youtube} />
    <DisplayField title="Spotify Link (Original Song)" text={arrangement.spotifyOriginalLink} />
    <DisplayField title="Spotify Link (Hangovers Version)" text={arrangement.spotifyHangoverLink} />
    <h3>Odds and Ends</h3>
    <TagList title="Tags" tags={arrangement.tags} />
    <DisplayField title="Notes" text={arrangement.notes} />
  </Full>;

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
