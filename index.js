const express = require('express');
const server = express();
const knex = require('knex');
const cors = require('cors');
const dbConfig = require('./knexfile.js');
const dbr = require('./data/modelNote.js');
const db = knex(dbConfig.development);
const PORT = process.env.PORT || 8000;

server.use(express.json());
server.use(cors());

server.get('/api/notes/', (req, res) => {
	dbr
		.getNotes()
		.then(notes => res.status(200).json(notes))
		.catch(err => res.status(500).json(err));
});

server.get('/api/notes/:id', (req, res) => {
	dbr
		.getNote(req.params.id)
		.then(note => res.status(200).json(note))
		.catch(err => res.status(500).json(err));
});

server.post('/api/notes/', (req, res) => {
	dbr
		.addNote(req.body)
		.then(id => res.status(200).json(id))
		.catch(err => res.status(500).json(err));
});

server.put('/api/notes/:id', (req, res) => {
	dbr
		.editNote(req.body, req.params.id)
		.then(numberUpdated => res.status(202).json(numberUpdated))
		.catch(err => res.status(500).json(err));
});

server.delete('/api/notes/:id', (req, res) => {
	dbr
		.deleteNote(req.params.id)
		.then(numDeleted => res.status(200).json(numDeleted))
		.catch(err => res.status(500).json(err));
});
server.listen(PORT, () => console.log(`API running on port ${PORT}`));
