import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Sage = () => (
  // eslint-disable-next-line
  <div className="sage">
    Hello World
  </div>
);

Sage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// for now, we want it all!
const select = state => state;

// Wrap the component to inject dispatch and state into it
export default connect(select)(Sage);
