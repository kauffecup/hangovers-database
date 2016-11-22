import React, { PropTypes } from 'react';
import HangoverLink from '../links/HangoverLink';

const HangoverList = ({ title, hangovers = [] }) => hangovers.length ?
  <div>
    <span>{title}</span>
    <span>{hangovers.map(h =>
      <HangoverLink key={h._id} {...h} />
    )}</span>
  </div> : null;

HangoverList.propTypes = {
  title: PropTypes.string,
  hangovers: PropTypes.array,
};

export default HangoverList;
