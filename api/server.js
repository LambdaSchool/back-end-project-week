const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());

const notes = require('./routes/notes.js');
server.use('/notes', notes);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'operational' });
});

module.exports = server;