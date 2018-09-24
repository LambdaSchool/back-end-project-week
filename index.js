const express = require('express'); 
const knex = require('knex'); 

const server = express(); 
server.use(express.json()); 

const dbConfig = require('./knexfile'); 
const db = knex(dbConfig.development); 

server.get("/", (req, res) => {
    res.status(200).json({message: "This worked!"})
}); 

server.get("/api/notes", (req, res) => {
    db('notes').then(notes => {
        res.status(200).json(notes); 
    }).catch(err => {
        res.status(500).json({error: "Error accessing the data from the database"})
    })
}); 


server.listen(9000, () => console.log("Server listening at Port 9000")); 