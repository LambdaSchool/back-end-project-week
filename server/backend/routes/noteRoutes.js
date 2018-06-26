const express = require("express");
const router = express.Router();

const Note = require("../models/Notes");
const User = require("../models/User");

router
  .route("/")
  .get((req, res) => {
    Note.find()
      .populate("user", "id/password")
      .select("id")
      .then(notes => {
        res.json(notes);
      })
      .catch(err => {
        res.status(500).json([{ error: err.message }]);
      });
  })
  .post((req, res) => {
    const { title, content, userId } = req.body;
    if (!title || !content) {
      res.status(400).json([{ error: "Title and content required." }]);
      return;
    }
    User.findById(userId)
      .then(user => {
        if (!user) {
          res.status(404).json("user not found!");
        } else {
          const newNote = new Note({ title, content, user: userId });
          newNote
            .save()
            .then(savedNote => {
              user.notes.push(savedNote._id);
              User.create(user).catch(err => {
                res.status(500).json({ error: err.message });
              });
              res.status(201).json(savedNote);
            })
            .catch(err => {
              res.status(500).json({ error: err.message });
            });
        }
      })
      .catch(err => {
        res.status(500).json([{ error: err.message }]);
      });
  });
router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    Note.findById(id)
      .then(note => {
        User.find({ notes: id }).then(notes => {
          const note = { user: notes };
          res.json(note);
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
      .then(note => {
        if (note === null) {
          res.status(404).json({
            error: `No note with id${id} found.`
          });
          return;
        }
        res.json({
          success: "Note deleted successfully.",
          removedNote: Note
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
      sendError(400, "Must provide title and content to update the note", res);
      return;
    }
    Note.findByIdAndUpdate(id, req.body)
      .then(updatedNote => {
        if (updatedNote === null) {
          res.status(404).json({
            error: `No note with id${id} found.`
          });
          return;
        }
        res.json({
          success: "Note updated successfully",
          updatedNote: updatedNote
        });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

module.exports = router;
