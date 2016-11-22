import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import AlbumLink from '../components/links/AlbumLink';
import ArrangementLink from '../components/links/ArrangementLink';
import ConcertLink from '../components/links/ConcertLink';
import HangoverList from '../components/lists/HangoverList';
import { getSemester } from '../actions';
import { semesterFormatter } from '../normalizers/adaptFormData';
import { PADDING_UNIT } from '../StyleConstants';

class Semester extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getSemester(id));
  }

  render() {
    const { semester, loading } = this.props;
    if (loading) {
      return <div>loading</div>;
    }
    return (
      <div className={css(styles.arrangement)}>
        <h2>{semesterFormatter(semester)}</h2>
        <HangoverList title="MD" hangovers={semester.md} />
        <HangoverList title="BM" hangovers={semester.bm} />
        <HangoverList title="President" hangovers={semester.president} />
        <h3>Arrangements</h3>
        {semester.whenArranged && semester.whenArranged.length ? semester.whenArranged.map(a =>
          <ArrangementLink key={a._id} {...a} />
        ) : '...nothin'}
        <h3>Concerts</h3>
        {semester.concerts && semester.concerts.length ? semester.concerts.map(c =>
          <ConcertLink key={c._id} {...c} />
        ) : '...nothin'}
        <h3>Songs Performed</h3>
        {semester.whenPerformed && semester.whenPerformed.length ? semester.whenPerformed.map(s =>
          <ArrangementLink key={s._id} {...s} />
        ) : '...nothin'}
        <h3>Albums</h3>
        {semester.albums && semester.albums.length ? semester.albums.map(a =>
          <AlbumLink {...a} />
        ) : '...nothin'}
        <h3>Hangovers Graduated</h3>
        <HangoverList hangovers={semester.graduatingHangs} />
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

Semester.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  semester: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the semester state
const mapStateToProps = (state, routerProps) => ({
  loading: state.semester.loading,
  semester: state.semester.semester,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Semester);
