export default children => children && (
  (children.props && children.props.children && children.props.children.length) ||
  (children.length && children.some(hasSomethingBesidesTitle)) ||
  (hasSomethingBesidesTitle(children))
);

const hasSomethingBesidesTitle = (child) => {
  if (child && child.props) {
    for (const key of Object.keys(child.props)) {
      if (key !== 'title' && child.props[key]) {
        return true;
      }
    }
  }
  return false;
};
