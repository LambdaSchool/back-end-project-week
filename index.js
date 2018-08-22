const express = require("express");
const db = require("./data/db");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("up and running...");
});

//* Display List of notes
server.get(
  "postgres://zpuhklwvlraxkl:62ecc2d3debd4c768f754dae97bdff080a5e2f922d692456f73054a135b2026a@ec2-50-16-196-138.compute-1.amazonaws.com:5432/dcm0572f53nf1t/all",
  (req, res) => {
    db("notes")
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => res.status(500).json(err));
  }
);

//* POST Request db insert()
server.post("/create", (req, res) => {
  const user = req.body;

  if (!user.title && !user.textBody) {
    return res.status(400).json({
      errorMessage: "Please provide the text for the post."
    });
  }

  db("notes")
    .insert({
      title: req.body.title,
      textBody: req.body.textBody
    })
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...user });
    })
    .catch(err => res.status(500).json(err));
});

//* GET with id CAn View Data
server.get("/:id", (req, res) => {
  const { id } = req.params;

  db("notes")
    .select() //! <------ Knex SELECT
    .where("_id", id) //! <----- WHERE id =
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

//* DELETE  by id Successfully
server.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where("_id", id)
    .del()
    .then(response => {
      if (!response) {
        res
          .status(404)
          .json({ response, message: `Action ${id} doesn't exist.` });
        return;
      }
      res
        .status(200)
        .json({ response, message: `Action ${id} has been deleted.` });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//* UPDATE Request postDb update().
server.put("/:id", (req, res) => {
  const { title, textBody } = req.body;
  const { id } = req.params;

  if (!title && !textBody) {
    res.status(400).json({
      errorMessage: "Please provide title and user id for the posts."
    });
  }
  db("notes")
    .where("_id", id)
    .update({ title: title, textBody: textBody })
    .then(response => {
      if (!response) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json({ title, textBody });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be updated" })
    );
});

const port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
