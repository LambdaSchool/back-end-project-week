const express = require('express');
const Middleware = require('./middleware/middleware.js')
const server = express();
const PORT  = process.env.PORT || 3111;


// ** IMPORTING MIDDLEWARE ** //

Middleware(server);


server.listen( PORT, ()=>{
    console.log(`\n //***  -LAMBDA NOTES SERVER -  Listening on http://localhost:${PORT} ***//\n`)
})
