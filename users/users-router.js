const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.post('/', (req, res) => {
  const userData = req.body;

  Users.insert(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new scheme' });
    });
});

router.delete('/id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: 'User removed successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'User was not deleted' });
    });
});

module.exports = router;
