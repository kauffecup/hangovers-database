// first our light/med/dark gray
export const BLACK_SQUEEZE = '#F5F9FC';
export const REGENT_GRAY = '#8C969E';
export const OXFORD_GRAY = '#333A4C';
// accent blue
export const SHAKESPEARE = '#58ACD6';
// accent red
export const FROLY = '#EE757E';
// banner greens
export const PEPPERMINT = '#E6F6E3';
export const ATLANTIS = '#A0D045';

// size constants
export const PADDING_UNIT = 20;
export const NAVBAR_WIDTH = 80;
export const LIST_ITEM_HEIGHT = 30;

// wrap a style object in a mediaquery for tiny things
export const mobilize = styleObj => ({
  '@media (max-device-width: 750px)': styleObj,
});
