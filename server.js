const express = require('express');
const cors = require('cors');
require('dotenv').config()
const routes = require('./api/routes/routes')


const server = express();



const corsOptions = {
  // origin: 'http://localhost:3000',
  // credentials: true
}

server.use(express.json());
server.use(cors(corsOptions));

routes(server);

module.exports = {
  server
};