const bcrypt = require('bcryptjs')
const db = require('../data/dbConfig.js')
const { generateToken } = require('../middlewares/custom-middlewares.js')




module.exports = server => {
server.post('/api/register', register)
server.post('/api/login', login)
server.get('/api/logout', logout)
server.post('/api/tag', addTag)
server.get('/api/tag', getTags)
}



// Register endpoint
const register = (req, res) => {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash

    db('users')
    .insert(creds)
    .then(ids => {
        const token = generateToken(creds.username)
        req.session.token = token
        res.status(200).json({message: `Successful login.`, token})
    })
    .catch(err => res.status(500).json(`There was an error: ${err}`))
}

// Login endpoint
const login = (req, res) => {
    creds = req.body
    db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(creds.password, user.password)) {
            const token = generateToken(user)
            req.session.token = token
            res.status(200).json({message: `Welcome ${user.username}`, token})
        }
    })
    .catch(err => res.status(500).json({message: `Error: ${err}`}))
}

const logout = (req, res) => {
    req.session = null
    res.json({message: 'cookie destroyed'})
}

const addTag = (req, res) => {
    const {tag, notes_id} = req.body
    db('tags')
    .insert({tag, notes_id}, '*')
    .then(tag => {
        res.status(200).json(tag)
    })
    .catch(err => res.status(500).json({message: `Error: ${err}`}))
}

const getTags = (req, res) => {
    db('tags')
    .then(tags => {
        res.status(200).json(tags)
    })
    .catch(err => res.status(500).json({message: `Error: ${err}`}))
}