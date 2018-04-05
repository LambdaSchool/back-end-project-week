const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./api/routes/routes');
const path = require('path');
const mongoose = require('mongoose');

const server = express();
const corsOptions = {
  "origin": "http://localhost:3000",
  "credentials": true
};

server.use(express.json());
server.use(cors(corsOptions));
// server.use(express.static(path.join('lambda-notes/build')));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONOGODB_URI || 'mongodb://localhost/lambda-notes');
// mongoose.connect('mongodb://localhost/lambda-notes', {
//   useMongoClient: true
// });

routes(server);

module.exports = {
  server
};