const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors')

server.use(express.json());
server.use(cors());

mongoose
  .connect('mongodb://hillal20:Settara200@ds233500.mlab.com:33500/lambdanotesdb')
  .then(p => { console.log('=== connected to lambdaNotesDB==') })
  .catch(err => { console.log(`err:${err}`) })

server.get('/', (req, res) => {
  res.status(200).json({ msg: 'api is running!' })
})

const lambdaNotesRoute = require('./lambdaNotesRoute.js');
server.use('/notes', lambdaNotesRoute);
const usersRoute = require('./usersRoute.js');
server.use('/users', usersRoute);


server.listen(5555, () => {
  console.log('\n=== server is running on 5555 ==')
})
