import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { stringify } from 'query-string';
import { getArrangement } from '../actions';

const Field = ({ title, text, children }) => children || typeof text === 'string' ? // eslint-disable-line
  <div>
    { typeof title === 'string' ? <span>{title}</span> : null }
    <span>{text}</span>
    { children || null }
  </div>
: null;

const ArrangementField = ({ arrangement, field, title }) => // eslint-disable-line
  <Field title={title} text={arrangement[field]} />;

const ArrangementObjectField = ({ arrangement, field, title, parse }) => // eslint-disable-line
  <Field title={title} text={arrangement[field] && (parse || (a => a.name))(arrangement[field])} />;

const ArrangementObjectArrayField = ({ arrangement, field, title, map }) => // eslint-disable-line
  <Field title={title} text={arrangement[field] && arrangement[field].map(map || (a => a.name)).join(', ')} />;

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
        <h2>{arrangement.name}</h2>
        <h3>The Song</h3>
        <ArrangementField field="alternateName" arrangement={arrangement} />
        <ArrangementObjectArrayField title="originally performed by" field="originalArtists" arrangement={arrangement} />
        <ArrangementObjectField title="genre" field="genre" arrangement={arrangement} />
        <ArrangementField field="whenWritten" arrangement={arrangement} />
        <h3>The Arrangement</h3>
        <ArrangementObjectArrayField title="arranged by" field="arrangers" map={h => `${h.firstName} ${h.lastName}`} arrangement={arrangement} />
        <ArrangementObjectField title="arranged" field="whenArranged" parse={s => `${s.semester_type} ${s.year}`} arrangement={arrangement} />
        <Field text={arrangement.syllables ? 'has syllables' : 'doesn\'t have syllables'} />
        <ArrangementObjectField title="type" field="arrangementType" parse={at => `${at.name} (${at.description})`} arrangement={arrangement} />
        <ArrangementObjectField title="quality" field="quality" parse={q => `${q.name} (${q.description})`} arrangement={arrangement} />
        <h3>Performances</h3>
        <ArrangementObjectArrayField title="semester(s) performed" field="whenPerformed" map={s => `${s.semester_type} ${s.year}`} arrangement={arrangement} />
        <ArrangementObjectArrayField title="concert(s) performed" field="concerts" arrangement={arrangement} />
        <ArrangementObjectArrayField title="album(s) on" field="albums" arrangement={arrangement} />
        <ArrangementObjectArrayField title="soloist(s)" field="soloists" map={h => `${h.firstName} ${h.lastName}`} arrangement={arrangement} />
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
