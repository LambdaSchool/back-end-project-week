
const notesDB = require('../database/helpers/noteDb');

module.exports = server => {
    server.get('/', getAllNotes);
    server.post('/', addNote);
    server.delete('/:id', deleteNote);
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await notesDB.get();
        res.status(200).send(notes);
    } catch(e) {
        res.status.send(e);
    }
};

const addNote = async (req, res) => {
    const note = req.body;

    if(note.title && note.description && note.user_id) {
        const posted = await notesDB.add(note);
        res.status(201).json(posted);
    } else {
        res.status(401).json({ message: 'The note is missing data' })
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deleted = await notesDB.remove(id);
        res.status(200).json(deleted);
    } catch(e) {
        res.status.send(e);
    }
};