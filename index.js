const express = require('express');
const db = require('./database/dbConfig');

const server = express();
server.use(express.json());

// Root endpoint
server.get('/', (req, res) => {
    res.status(200).json({ message: 'API up' });
});

// Notes endpoints
// add a note to the db
server.post('/create', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (title && content) {
            await db('notes').insert({ title: title, content: content });
            res.status(201).json({ message: 'Note created.'});
        } else {
            res.status(500).json({ message: 'Title and content required.'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get an array of all the notes
server.get('/notes', async (req, res) => {
    try {
        const notes = await db('notes');
        res.status(200).json(notes);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get a single note
server.get(`/note/:id`, async (req, res) => {
    try {
        const id = req.params.id;
        const note = await db('notes').where({ id: id });
        if (note.length > 0) {
            res.status(200).json(note);
        } else {
            res.status(500).json({ message: 'Invalid id. Note does not exist.' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// edit a note
server.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const edits = req.body;
        const successIndicator = await db('notes').where({ id: id }).update(edits);
        if (successIndicator) {
            res.status(200).json({ message: 'Edits made'});
        } else {
            res.status(500).json({ message: 'Invalid id. Note does not exist.' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});




const port = process.env.PORT || 8500;

server.listen(port, () => { console.log(`\nServer up on port ${port}\n`) });