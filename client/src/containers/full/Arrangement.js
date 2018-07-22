import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArrangement } from '../../actions';
import AlbumList from '../../components/lists/AlbumList';
import ArtistList from '../../components/lists/ArtistList';
import ConcertList from '../../components/lists/ConcertList';
import DownloadList from '../../components/lists/DownloadList';
import LinkList from '../../components/lists/LinkList';
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

const Arrangement = ({ dispatch, arrangement, loading, match: { params: { id } } }) =>
  <Full
    title={arrangementFormatter(arrangement)}
    load={() => dispatch(getArrangement(id))}
    path={`/arrangements/edit/${id}`}
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
      <DisplayField text={arrangement.key && keyFormatter(arrangement.key)} />
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
      <DownloadList
        title="PDFs"
        type="PDF"
        arrangementName={arrangementFormatter(arrangement)}
        downloads={arrangement.pdf}
      />
      <DownloadList
        title="Finales"
        type="Finale"
        arrangementName={arrangementFormatter(arrangement)}
        downloads={arrangement.finale}
      />
      <DownloadList
        title="Recordings"
        type="Recording"
        arrangementName={arrangementFormatter(arrangement)}
        downloads={arrangement.recording}
      />
      <LinkList title="Youtube Links" links={arrangement.youtube} />
      <LinkList title="Spotify Links (Original Song)" links={arrangement.spotifyOriginalLink} />
      <LinkList title="Spotify Links (Hangovers Version)" links={arrangement.spotifyHangoverLink} />
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
const mapStateToProps = (state) => ({
  loading: state.arrangement.loading,
  arrangement: state.arrangement.arrangement,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Arrangement);
