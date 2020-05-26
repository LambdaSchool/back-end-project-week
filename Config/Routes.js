const axios = require('axios')
const { authenticate, tokenGenerator} = require('../Auth/authenticate')
const bcrypt = require('bcryptjs')
const knex = require('knex')
const dbConfig = require('../knexfile.js')
const db = knex(dbConfig.development)


module.exports = server => {
        server.post('/api/register', register),
        server.post('/api/login', login),
        server.get('/api/home', authenticate, accessPage)
    }


function register (req, res) {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 4)
    creds.password = hash

    db('login').insert(creds)
      .then(ids => {
          const id = ids[0]
          db('login').where({id}).first()
            .then( user => {
                const token = tokenGenerator(user)
                res.status(201).json({user, token})
            })
      })
      .catch(err => { res.status(400).json({err: "Unable to register user. Please try again"})
    })
}

function login(req, res) {
    const creds = req.body
    db('login').where({ username: creds.username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)){
            const token = tokenGenerator(user)
            res.status(200).json({message: `Welcome ${creds.username}`, token})
        } else {
            res.status(401).json({message: 'Incorrect password! Please try again.'})
        }
    })
    .catch(err => { res.status(400).json({err: "There was an error logging the user in"})
  })
}

function accessPage(req, res) {
  const requestOptions = {
      headers: { accept: 'application/json' }
  }
 axios.get('http://localhost:5566/api/notes', requestOptions)
   .then(response => {
       res.status(200).json(response.data.results)
   })
   .catch(err => { res.status(400).json({err: "there was an error fetching the notes"})
   })
}

