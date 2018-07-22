import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArrangementList from '../../components/lists/ArrangementList';
import { getTag } from '../../actions';
import { tagFormatter } from '../../normalizers/adaptFormData';
import Full from '../../components/pages/Full';
import Card from '../../components/Card';

const Tag = ({ dispatch, tag, loading, match: { params: { id } } }) =>
  <Full
    title={tagFormatter(tag)}
    load={() => dispatch(getTag(id))}
    path={`/tags/edit/${id}`}
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
const mapStateToProps = (state) => ({
  loading: state.tag.loading,
  tag: state.tag.tag,
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Tag);
