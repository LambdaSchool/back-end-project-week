// 2 + 2 === 4;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongodb = require('mongodb')
const server = express();

// const { login } = require('./login.js');
const Note = require('./noteModel');
const User = require('./userModel');

server.use(bodyParser.json());

const url = process.env.MONGOLAB_URI;


mongoose.connect('mongodb://myman:man@ds163769.mlab.com:63769/heroku_rghr6r91', {}, err => {
    if(err) return console.log(err);
    console.log('Mango Up Bruh');
})

server.get('/', (req, res) => {
    res.status(200).json({api: 'notes'})
})

// Notes Routes



server.get('/api/notes', (req, res) => {
    Note
    .find({})
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(error => {
        res.status(500).json({ error: 'No notes!' })
    })
})

server.post('/api/notes/newnote', (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    newNote
    .save()
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(422).json({ err: 'Error when creating the note' });
    });
})


// New User Routes //

server.get('/api/notes/users', (req, res) => {
    User
    .find({})
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ err: 'Could not display users...' })
    })
})

server.post('/api/notes/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    newUser
    .save()
    .then(newuser => {
        res.status(200).json(newuser)
    })
    .catch(err => {
        res.status(422).json({ err: 'Could not create user...' });
    })

})

// server.post('/api/notes/login', (req, res) => {

// });



const port = 5000;

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`Mangos Grown at ${port}`)
})



