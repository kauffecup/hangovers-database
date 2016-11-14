import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import ArrangementLink from '../components/links/ArrangementLink';
import SemesterLink from '../components/links/SemesterLink';
import { getConcert } from '../actions';
import { concertFormatter } from '../normalizers/adaptFormData';
import { PADDING_UNIT } from '../StyleConstants';

class Concert extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getConcert(id));
  }

  render() {
    const { concert, loading } = this.props;
    if (loading) {
      return <div>loading</div>;
    }
    return (
      <div className={css(styles.arrangement)}>
        <h2>{concertFormatter(concert)}</h2>
        {concert.semester && concert.semester.length ?
          <SemesterLink {...concert.semester[0]} />
        : null}
        <h3>Set List</h3>
        {concert.setList && concert.setList.length ? concert.setList.map(a =>
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

Concert.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  concert: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the concert state
const mapStateToProps = (state, routerProps) => ({
  loading: state.concert.loading,
  concert: state.concert.concert,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Concert);
