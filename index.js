require('dotenv').config();
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
  res.send('API up and running!')
})

server.get('/api/notes', (req, res) =>  {
  db('notes')
  .then(notes => {
    res.status(200).json(notes);
  })
  .catch(err => {
    res.status(500).json({ error: "The notes could not be retrieved." })
  })
})

server.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  db('notes')
    .where('id', id)
    .then(response => {
      if (response.length === 0) {
        res.status(404).json({ error: 'The note with the specified ID does not exist'})
      }
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve note'})
    })
})

server.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Please provide a title and content for the note'})
  }
  db.insert({ title, content })
  .into('notes')
  .then(response => {
    res.status(201).json(response)
  })
  .catch(err => {
    res.status(500).json({ error: 'Could not create a new note' })
  })
})

server.put('/api/notes/:id', (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  db('notes')
  .where('id', id)
  .update({ title, content })
  .then(response => {
      res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({ error: 'Could not edit the note'})
  })
})

server.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    db('notes')
    .where('id', id)
    .delete()
    .then(response => {
        if(response.length === 0) {
            res.status(404).json({ error: 'The note with the specified ID does not exist'});
        }
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ error: "Could not delete the note"})
    })
})

const port = process.env.PORT || 8000;
server.listen(port, function() {
    console.log(`\n===Web API listening on http://localhost:${port} ===\n`);
});
