if (process.env.NODE_ENV === 'production') {
  module.exports = require('react-router').browserHistory;
} else {
  module.exports = require('react-router').hashHistory;
}
