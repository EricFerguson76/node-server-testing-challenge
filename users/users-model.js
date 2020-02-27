const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
  remove
};

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
