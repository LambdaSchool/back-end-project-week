require("dotenv").config();

const express = require("express");
const knex = require("knex");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const knexConfig = require("./knexfile.js");

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(helmet());

//============================================================================== Server Check <-----
server.get("/", (req, res) => {
  res.json({ api: "running" });
});
//============================================================================== Get All Notes <-----
server.get("/notes", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching notes", error: err });
      console.error(err);
    });
});

//============================================================================== Get Note by ID <-----
server.get("/notes/:id", (req, res) => {
  db("notes")
    .where("id", req.params.id)
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ message: err });
      console.error(err);
    });
});
//============================================================================== Post Note <-----
server.post("/notes", (req, res) => {
  db("notes")
    .insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: err });
      console.error(err);
    });
});
//============================================================================== Edit Note <-----
server.put("/notes/:id", (req, res) => {
  const changes = req.body;
  db("notes")
    .where("id", req.params.id)
    .update(changes)
    .then(response => {
      res.status(200).json("note updated");
    })
    .catch(err => {
      res.status(500).json({ message: "error updating this note" });
    });
});
//============================================================================== Delete Note <-----
server.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  db("notes")
    .where("id", req.params.id)
    .del(id)
    .then(deleteCount => {
      res.status(200).json({
        message: "Delete success"
      });
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting this action" });
    });
});
//============================================================================== Server Initialization <----
const port = process.env.PORT || 9000;

server.listen(port, () => console.log(`\n=== Running on port ${port} ===\n`));
