const express = require('express');
const cors = require("cors")
const server = express();

server.use(cors());
server.use(express.json());

//Server response get '/'
server.get('/', async (req, res) => {
    res.status(200).json({ response: 'we are ready' })
})
// Routers
const notesRouter = require('../router/notesRouter')


server.use('/notes', notesRouter)
module.exports = server;