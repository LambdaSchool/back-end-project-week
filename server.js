const express = require('express');

const notesRouter = require('./data/routers/notesRouter.js');

const server = express();

server.use(express.json());

server.use('/api/notes', notesRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Notes</h2>`);
});

server.use(logger);

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
}

module.exports = server;