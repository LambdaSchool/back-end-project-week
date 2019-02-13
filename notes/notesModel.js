const db = require('../data/dbConfig');

const getAllNotes = () => {
  return db('notes')
}

const getNoteByID = (id) => {
  return db('notes').where('id', id)
}

const createNote = (note) => {
  return db('notes').insert(note)
}

const updateNote =  (id, change) => {
  return db('notes').where('id', id).update(change)
}

const deleteNote = (id) => {
  return db('notes').where('id', id).del()
}

module.exports = {
  getAllNotes,
  getNoteByID,
  createNote,
  updateNote,
  deleteNote,
}