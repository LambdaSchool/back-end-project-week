const mongoose = require('mongoose');
const Note = require('../models/noteModel');

const editNote = (req, res) => {
  const { editedNote, id } = req.body;
  Note.findByIdAndUpdate(id, editedNote, { new: true })
    .then(newNote => {
      res.send(newNote);
    })
    .catch(err => res.send(err));
};

module.exports = {
  editNote,
};
