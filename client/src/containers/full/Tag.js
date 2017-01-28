import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArrangementList from '../../components/lists/ArrangementList';
import { getTag } from '../../actions';
import { tagFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';
import Card from '../../components/Card';

const Tag = ({ dispatch, id, tag, loading }) =>
  <Full
    title={tagFormatter(tag)}
    load={() => dispatch(getTag(id))}
    path={`/edit/tag/${id}`}
    loading={loading}
  >
    <Card title="Arrangements">
      <ArrangementList arrangements={tag.arrangements} />
    </Card>
  </Full>;

Tag.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  tag: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

// for now, we want the tag state
const mapStateToProps = (state, routerProps) => ({
  loading: state.tag.loading,
  tag: state.tag.tag,
  id: routerProps.params.id,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Tag);
