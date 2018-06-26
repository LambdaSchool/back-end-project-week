const express = require ('express');
const cors = require('cors');
const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const mongoose = require('mongoose');

const server = express();

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};

server.use(cors(corsOptions));

setupMiddleware(server);
setupRoutes(server);

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://$(process.env.MLABUSER}:${process.env.MLABPASSWD}@ds018538.mlab.com:${process.env.MLABPORT}/notes`, {}, err => {
	if (err) {
		console.log('\n===error connecting to mongodb ===\n')
		} else {
		console.log('\n===connected to mongodb ===\n')
		}
	});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n=== API up on port: $(port) === \n`));
	

