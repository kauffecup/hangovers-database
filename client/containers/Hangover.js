import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import ArrangementLink from '../components/links/ArrangementLink';
import ConcertLink from '../components/links/ConcertLink';
import SemesterList from '../components/lists/SemesterList';
import { getHangover } from '../actions';
import { hangoverFormatter } from '../normalizers/adaptFormData';
import { PADDING_UNIT } from '../StyleConstants';

class Hangover extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getHangover(id));
  }

  render() {
    const { hangover, loading } = this.props;
    if (loading) {
      return <div>loading</div>;
    }
    return (
      <div className={css(styles.arrangement)}>
        <h2>{hangoverFormatter(hangover)}</h2>
        <SemesterList title="Graduated" semesters={hangover.graduationSemester} />
        <SemesterList title="MDed" semesters={hangover.semestersMDed} />
        <SemesterList title="BMed" semesters={hangover.semestersBMed} />
        <SemesterList title="Presided" semesters={hangover.semestersPresided} />
        {hangover.concertsMDed && hangover.concertsMDed.length ?
          <div>
            <span>MDed</span>{hangover.concertsMDed.map(c =>
              <ConcertLink key={c._id} {...c} />
            )}
          </div>
        : null}
        <h3>Arranged</h3>
        {hangover.arrangers && hangover.arrangers.length ? hangover.arrangers.map(a =>
          <ArrangementLink key={a._id} {...a} />
        ) : '...nothin'}
        <h3>Soloed</h3>
        {hangover.soloists && hangover.soloists.length ? hangover.soloists.map(a =>
          <ArrangementLink key={a._id} {...a} />
        ) : '...nothin'}
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

Hangover.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  hangover: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the hangover state
const mapStateToProps = (state, routerProps) => ({
  loading: state.hangover.loading,
  hangover: state.hangover.hangover,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Hangover);
