/* global emit */

const userMapper = function (doc) {
  if (doc.type === 'user') {
    emit(doc._id, 1);
  }
};

const ddoc = {
  _id: '_design/users',
  language: 'javascript',
  views: {
    albums: { map: userMapper },
  },
};

module.exports = ddoc;
