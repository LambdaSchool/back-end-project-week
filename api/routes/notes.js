var express = require('express');
const router = express.Router();

const db = require('../../data/config');

router.use(express.json());

router.get('/', (req, res) => {
  db('notes')
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  const note = req.body;

  db('notes')
    .insert(note)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error inserting',
        err
      });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  return db('notes')
    .where({ id })
    .first()
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(404).json({ message: 'note not found' });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});




module.exports = router;