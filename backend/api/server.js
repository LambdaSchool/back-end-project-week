//dependencies
const notes = require('../data/notesModel.js')
const express = require('express')
const server = express()


//call dependencies
server.use(express.json())

//endpoints

//gets
server.get('/', (req, res) => {
    res.status(200).json({ api: 'alive' })
})
server.get('/notes', (req, res) => {
    notes.get()
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json(err))
})
server.get('/notes/:id', (req, res) => {
    const { id } = req.params
    notes.get(id)
        .then(note => res.status(200).json(note))
        .catch(err => res.status(500).json(err))
})

//post
server.post('/notes', (req, res) => {
    const { title, content } = req.body
    if (title && content) {
        notes.add(req.body)
            .then(note => res.status(201).json(note))
            .catch(err => res.status(500).json(err))
    } else {
        res.status(422).json({ message: 'Please enter note title and content.' })
    }
})

//put
server.put('/notes/:id', (req, res) => {
    const { id } = req.params
    if (title && content) {
        notes.update(req.body, id)
            .then(result => result ? res.status(200).json(result) : res.status(500).json({ message: 'No note updated.' }))
            .catch(err => res.status(500).json(err))
    } else {
        res.status(422).json({ message: 'Please enter note title and content.' })
    }
})

//delete
server.delete('/notes/:id', (req, res) => {
    const { id } = req.params
    notes.remove(id)
        .then(result => result ? res.status(200).json(result) : res.status(500).json({ message: 'No notes deleted.' }))
        .catch(err => res.status(500).json(err))
})
module.exports = server;