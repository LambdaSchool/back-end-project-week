// Import Dependencies 
const express = require('express'); // makes it easy to use node
const helmet = require('helmet'); // secure express apps
const cors = require('cors'); // allow cross-platform use
const mongoose = require('mongoose'); // allow mongoDB syntax
const bodyParser = require('body-parser'); // parse incoming body requests
const noteRouter = require('./routers/noteRouter'); // import Note Router  
const userRouter = require('/routers/userRouter'); // import User Router  

const port = 3000; // declare static port
const server = express(); // connect server to express


// Connect to DB
mongoose
.connect('mongodb://localhost/notesDB', { useMongoClient: true })
.then(mongo => {
    console.log('Properly connected to the notes DB. Well done!')
})
.catch(err => {
    console.log(err)
})


// Use the middleware
server.use(helmet()); // Use Middleware
server.use(cors()); // Use Middleware
server.use(bodyParser.json()); // Use Middleware
server.use('/api/notes', noteRouter); // use Note Router
server.use('/api/user', userRouter); // use user Router


// API Request Endpoints
server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});


// Engage Server
server.listen(port, () => console.log(`\n === API is up and running on: ${port} === \n`))
