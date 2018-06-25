require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors');

const server = express()

server.use(helmet())
server.use(express.json())
server.use(morgan('combined'))

const port = process.env.PORT || 5000

mongoose.connect('mongodb://' + process.env.DB_USER + process.env.DB_PASS + '@ds217671.mlab.com:17671/lambdanotes', {}, err => {
    if (err) {
        console.log(`That didn't go as planned`)
    } else {
    console.log(`Hurray for environment variables!`)
    }
})

server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})