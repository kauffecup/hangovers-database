import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArrangementList from '../../components/lists/ArrangementList';
import { getNonHangover } from '../../actions';
import { nonHangoverFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';
import Card from '../../components/Card';

const NonHangover = ({ dispatch, id, nonHangover, loading }) =>
  <Full
    title={nonHangoverFormatter(nonHangover)}
    load={() => dispatch(getNonHangover(id))}
    path={`/nonhangovers/edit/${id}`}
    loading={loading}
  >
    <Card title="Arrangements">
      <ArrangementList arrangements={nonHangover.arrangements} />
    </Card>
  </Full>;

NonHangover.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  nonHangover: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the nonHangover state
const mapStateToProps = (state, routerProps) => ({
  loading: state.nonHangover.loading,
  nonHangover: state.nonHangover.nonHangover,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(NonHangover);
