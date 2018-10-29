const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./data/dbConfig.js');

const server = express();

server.use(helmet());
server.use(morgan('combined'));
server.use(cors());
server.use(express.json());


server.get('/notes', (req, res)=> {
    db('notes')
    .then(notes=> {
        if (notes === 0) {
            res.status(404).json({message: "The information you requested does not exist"});
        }
        res.status(200).json(notes);
    })
    .catch(err=> {
        res.status(500).json({error: "The information could not be retrieved from the database"});
    })
});

server.get('/notes/:id', (req, res)=> {
    const {id} = req.params;
    db('notes')
        .where({id})
        .first()
        .then(note=> {
            if (!note) {
                res.status(404).json({message: "The information you requested does not exist"});
            } else {
                res.status(200).json(note);
            }
        })
        .catch(err=> {
            res.status(500).json({error: "The information could not be retrieved from the database"});
        })
});


server.listen(9000, ()=> console.log('API running on port 9000'));
