import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'query-string';
import { getArrangement } from '../../actions';
import AlbumList from '../../components/lists/AlbumList';
import ArtistList from '../../components/lists/ArtistList';
import ConcertList from '../../components/lists/ConcertList';
import HangoverList from '../../components/lists/HangoverList';
import NonHangoversList from '../../components/lists/NonHangoversList';
import SemesterList from '../../components/lists/SemesterList';
import TagList from '../../components/lists/TagList';
import Full from '../../components/pages/Full';
import DisplayField from '../../components/DisplayField';
import Card from '../../components/Card';
import {
  keyFormatter,
  arrangementFormatter,
  arrangementTypeFormatter,
} from '../../normalizers/adaptFormData';

const Arrangement = ({ dispatch, id, arrangement, loading }) =>
  <Full
    title={arrangementFormatter(arrangement)}
    load={() => dispatch(getArrangement(id))}
    path={`arrangements/edit/${id}`}
    loading={loading}
  >
    <Card title="Song">
      <ArtistList title="originally performed by" artists={arrangement.artists} />
      <DisplayField title="genre(s)" text={arrangement.genre && arrangement.genre.length && arrangement.genre.map(g => g.name).join(', ')} />
      <DisplayField title="released" text={arrangement.whenWritten} />
    </Card>
    <Card title="Arrangement">
      <HangoverList title="arranged by" hangovers={arrangement.arrangers} />
      <NonHangoversList
        title={arrangement.arrangers && arrangement.arrangers.length ? 'and' : 'arranged by'}
        nonHangovers={arrangement.nonHangoverArrangers}
      />
      <DisplayField text={keyFormatter(arrangement.key)} />
      <SemesterList title="arranged" semesters={[arrangement.semesterArranged]} />
      <DisplayField text={arrangement.syllables ? 'has syllables' : 'doesn\'t have syllables'} />
      <DisplayField text={arrangementTypeFormatter(arrangement.arrangementType)} />
    </Card>
    <Card title="Performance">
      <DisplayField text={typeof arrangement.active === 'boolean' ? (arrangement.active ? 'active' : 'not active') : null} />
      <SemesterList title="semester(s) performed" semesters={arrangement.semestersPerformed} />
      <ConcertList title="concert(s) performed" concerts={arrangement.concerts} />
      <AlbumList title="album(s) on" albums={arrangement.albums} />
      <HangoverList title="soloist(s)" hangovers={arrangement.soloists} />
    </Card>
    <Card title="Files and Such">
      {arrangement._attachments ? Object.keys(arrangement._attachments).map(aid =>
        <div key={aid}><a
          href={`/api/arrangementfile?${stringify({
            arrangementID: id,
            attachmentID: aid,
            type: arrangement._attachments[aid].content_type,
          })}`}
          download
        >
          {`download ${aid}`}
        </a></div>,
        ) : null}
      <DisplayField title="Youtube Link" link={arrangement.youtube} />
      <DisplayField title="Spotify Link (Original Song)" link={arrangement.spotifyOriginalLink} />
      <DisplayField title="Spotify Link (Hangovers Version)" link={arrangement.spotifyHangoverLink} />
    </Card>
    <Card title="Odds and Ends">
      <TagList title="Tags" tags={arrangement.tags} />
      <DisplayField title="Notes:" text={arrangement.notes} />
    </Card>
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
