const cl = console.log;
const express = require("express");

const db = require("./middleware/helpers");
const PORT = 4200;

const server = express();

server.use(express.json());

server.get("/notes", (req, res) => {
  db.getNotes().then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});