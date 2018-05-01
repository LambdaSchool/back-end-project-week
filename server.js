const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const Note = require('./models/note');

const server = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('\n==== Connected to Mongo ====\n');
  })
  .catch(() => {
    console.log('\n++++ ERROR connecting to Mongo ++++\n');
  });

server.use(morgan('combined'));
server.use(cors());
server.use(express.json());

// Controllers
// sanity check
server.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res.json({ err: err.message });
    });
});

// GET BY ID
server.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res.json({ err: 'Note could not be retrieved' });
    });
});

// POST
server.post('/api/notes', (req, res) => {
  const note = new Note(req.body);

  note
    .save()
    .then(savedNote => {
      res.json(savedNote);
    })
    .catch(err => {
      console.log(err.message);
    });
});
// GET
// DELETE
// PUT

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
