import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { LIST_ITEM_HEIGHT, PADDING_UNIT } from '../StyleConstants';

const rowRender = (list, ChildComponent) => ({ index, key, style }) => // eslint-disable-line
  <div key={key} style={style}>
    <div className={css(styles.row)}>
      <ChildComponent {...list[index]} />
    </div>
  </div>;

const styles = StyleSheet.create({
  row: {
    height: `${LIST_ITEM_HEIGHT}px`,
    padding: `${PADDING_UNIT / 2}px`,
  },
});

export default rowRender;
