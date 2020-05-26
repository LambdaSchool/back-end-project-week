const express = require('express')
const knex = require('knex')
const helmet = require('helmet')
const cors = require('cors')

const server = express(); 

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)
const configRoutes = require('../Config/Routes')


server.use(express.json(), helmet(), cors())
configRoutes(server)


server.get('/', (req, res) => {
    res.status(200).send("Success!")
})

server.get('/api/notes', (req, res) => { 
  db('notes').then( notes => {
      res.status(200).json(notes)
  })
  .catch( error => { res.status(400).json({error: "we've encountered an error"})
  })
})

server.get('/api/notes/:id', (req, res) => {
    const {id} = req.params
    db('notes').where({id}).then(content => {
        res.status(200).json(content)
    })
    .catch(error => { res.status(400).json({ error: "There was an error locating the user"})
  })
})

server.post('/api/notes', (req, res) => { 
    const body = req.body
    if(!body.textBody || !body.title){
        res.status(401).send("Missing a title or the text-body ")
    } else {
        db('notes').insert(body).then(id => {
          res.status(201).json(id) 
        })
        .catch( error => { res.status(400).json({error: "Unable to post note"})
        })
    }    
})

server.delete('/api/notes/:id', (req, res) => {
    const {id} = req.params
    db('notes').where({id}).del().then( ids => {
        res.status(200).json(ids)
    })
    .catch( error => { res.status(400).json({ error: "We were unable to delete the user"})
  })
})

server.put('/api/notes/:id', (req, res) => {
    const {id} = req.params
    const body = req.body
    db('notes').where({id}).update(body)
      .then( content => {
          res.status(201).json(content)
      })
      .catch( error => { res.status(400).json({ error: "there was an error deleting the user"})
    })
})

module.exports = {
    server
}



