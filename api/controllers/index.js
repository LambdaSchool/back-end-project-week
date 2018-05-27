const { createUser } = require('./User');
const { login } = require('./Login');
const { getUsers } = require('./GetUsers');
const { newNote } = require('./NewNote');
const { deleteNote } = require('./DeleteNote');
const { getNotes } = require('./GetNotes');
const { singleNote } = require('./SingleNote');
const { editNote } = require('./EditNote');

module.exports = {
  createUser,
  login,
  getUsers,
  newNote,
  deleteNote,
  getNotes,
  singleNote,
  editNote
};