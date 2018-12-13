require('dotenv').config()
const express = require('express');
const server = express();
const db = require('./notedb.js')
const userdb = require('./userdb.js')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const protect = require('./protect.js')


server.use(express.json())
server.use(cors());

server.get('/api/notes', [protect],(req,res) => {
    db.getNotes()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.get('/api/users', (req,res) => {
    db.getUsers()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.post('/api/users/register', (req, res) => {
    let userCred = req.body;
    const hash = bcrypt.hashSync(userCred.password, 8);
    userCred.password = hash;
    userdb.register(userCred)
    .then(id => {
        const payload = {
            id: id,
            username: userCred.username
        }
        const token = generateToken(payload)
        res.status(201).json(token)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

function generateToken(user) {
    console.log(user)
    const payload = {
      subject: user.id,
      username: user.username
    };
    console.log(process.env.SECRET)
    const secret = process.env.SECRET;
    console.log(secret)
    const options = {
      expiresIn: '5m',
    };
    console.log(options)
  
    return jwt.sign(payload, secret, options);
}

server.post('/api/users/login', (req, res) => {
    let userCred = req.body;
    userdb.login(userCred)
    .then(user => {
        if(user && bcrypt.compareSync(userCred.password, user[0].password)) {
            console.log(user[0].id);
            console.log(user[0].username)
            const token = generateToken(user[0]);
            console.log(token)
            res.status(200).json(token) //WE REACH THIS
            
        } else {
            res.status(401).json({message: 'Invalid information'})
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})


server.post('/api/notes', [protect],async (req, res) => {
    const note = await req.body;
    db.createNote(note)
    .then(id => {
        res.status(201).json(id);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})


server.get('/api/notes/:id', [protect],(req,res) => {
    const id = req.params.id;
    db.viewNote(id)
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(404).json(err);
    })
})

server.put('/api/notes/:id', [protect],(req, res)  => {
    const id = req.params.id;
    const content = req.body;
    db.editNote(content, id)
    .then(num => {
        res.status(200).json(num);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})

server.delete('/api/notes/:id', [protect], (req, res) => {
    const id = req.params.id;
    db.deleteNote(id)
    .then(num => {
        res.status(200).json(num);
    })
    .catch(err => {
        res.status(404).json(err);
    })
})

module.exports = server;