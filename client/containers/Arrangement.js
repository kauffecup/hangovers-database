import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { stringify } from 'query-string';
import { getArrangement } from '../actions';
import PathButton from '../components/PathButton';
import AlbumLink from '../components/links/AlbumLink';
import ConcertLink from '../components/links/ConcertLink';
import HangoverLink from '../components/links/HangoverLink';
import SemesterLink from '../components/links/SemesterLink';
import { PADDING_UNIT } from '../StyleConstants';

const Field = ({ title, text, children }) => children || typeof text === 'string' ? // eslint-disable-line
  <div>
    { typeof title === 'string' ? <span>{title}</span> : null }
    { typeof text === 'string' ? <span>{text}</span> : null }
    { children || null }
  </div>
: null;

const ArrangementField = ({ arrangement, field, title }) => // eslint-disable-line
  <Field title={title} text={arrangement[field]} />;

const ObjectField = ({ arrangement, field, title, parse }) => // eslint-disable-line
  <Field title={title} text={arrangement[field] && (parse || (a => a.name))(arrangement[field])} />;

const ObjectArrayField = ({ arrangement, field, title, map }) => // eslint-disable-line
  <Field title={title} text={arrangement[field] && arrangement[field].map(map || (a => a.name)).join(', ')} />;

const ObjectComponentArrayField = ({ arrangement, field, title, map }) => // eslint-disable-line
  <Field title={title}>{arrangement[field] && arrangement[field].length ? arrangement[field].map(map) : null}</Field>;

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
        <h3>The Song</h3>
        <ArrangementField field="alternateName" arrangement={arrangement} />
        <ObjectArrayField title="originally performed by" field="originalArtists" arrangement={arrangement} />
        <ObjectField title="genre" field="genre" arrangement={arrangement} />
        <ArrangementField field="whenWritten" arrangement={arrangement} />
        <h3>The Arrangement</h3>
        <ObjectComponentArrayField title="arranged by" field="arrangers" map={h => <HangoverLink key={h._id} {...h} />} arrangement={arrangement} />
        <Field title="arranged">{arrangement.whenArranged ?
          <SemesterLink {...arrangement.whenArranged} />
        : null}</Field>
        <Field text={arrangement.syllables ? 'has syllables' : 'doesn\'t have syllables'} />
        <ObjectField title="type" field="arrangementType" parse={at => `${at.name} (${at.description})`} arrangement={arrangement} />
        <ObjectField title="quality" field="quality" parse={q => `${q.name} (${q.description})`} arrangement={arrangement} />
        <h3>Performances</h3>
        <Field text={arrangement.active ? 'active' : 'not active'} />
        <ObjectComponentArrayField title="semester(s) performed" field="whenPerformed" map={s => <SemesterLink key={s._id} {...s} />} arrangement={arrangement} />
        <ObjectComponentArrayField title="concert(s) performed" field="concerts" map={c => <ConcertLink key={c._id} {...c} />} arrangement={arrangement} />
        <ObjectComponentArrayField title="album(s) on" field="albums" map={a => <AlbumLink key={a._id} {...a} />} arrangement={arrangement} />
        <ObjectComponentArrayField title="soloist(s)" field="soloists" map={h => <HangoverLink key={h._id} {...h} />} arrangement={arrangement} />
        <h3>Files and Such</h3>
        {arrangement._attachments ? Object.keys(arrangement._attachments).map(aid =>
          <Field>
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
          </Field>
        ) : null}
        <ArrangementField title="Youtube Link" field="youtube" arrangement={arrangement} />
        <ArrangementField title="Spotify Link (Original Song)" field="spotifyOriginalLink" arrangement={arrangement} />
        <ArrangementField title="Spotify Link (Hangovers Version)" field="spotifyHangoverLink" arrangement={arrangement} />
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
