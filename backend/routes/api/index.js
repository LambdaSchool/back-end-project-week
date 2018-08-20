const express = require('express');
const server = express();
const handlers = require('../handlers')

server.get('/users', handlers.getUsers)
server.get('/user/:user_id', handlers.verifyUser, handlers.getUserNotes)
server.get('/notes', handlers.getNotes)
server.get('/user/:user_id/note/:note_id', handlers.verifyUser, handlers.verifyNote, handlers.getANote)

server.post('/user/:user_id/notes', handlers.verifyUser, handlers.postNote)
server.post('/register', handlers.register)
server.post('/signin', handlers.signIn)

server.delete('/user/:user_id/note/:note_id', handlers.verifyUser, handlers.verifyNote, handlers.deleteNote)

module.exports = server;