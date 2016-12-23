import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import PathButton from '../../components/PathButton';
import ArrangementList from '../../components/lists/ArrangementList';
import { getTag } from '../../actions';
import { tagFormatter } from '../../normalizers/adaptFormData';
import { PADDING_UNIT } from '../../StyleConstants';

class Tag extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getTag(id));
  }

  render() {
    const { tag, loading, id } = this.props;
    if (loading) {
      return <div>loading</div>;
    }
    return (
      <div className={css(styles.tag)}>
        <PathButton text="edit" path={`/edit/tag/${id}`} />
        <h2>{tagFormatter(tag)}</h2>
        <h3>Arrangements</h3>
        <ArrangementList arrangements={tag.arrangements} />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    flex: 1,
    'overflow-y': 'auto',
    padding: `${PADDING_UNIT}px`,
  },
});

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
