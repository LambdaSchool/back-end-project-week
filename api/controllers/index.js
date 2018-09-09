const { createUser, login, } = require('./user');

const { newNote, getNoteById, deleteNote, editNote } = require('./note')
const { getNoteByUser, addShareUser, getSharedNotes } = require('./userNotes')

module.exports = {
  login,
  createUser,
  newNote,
  getNoteById,
  deleteNote,
  getNoteByUser, 
  editNote,
  addShareUser,
  getSharedNotes
}