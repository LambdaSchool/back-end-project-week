const express = require('express');
const  helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const RouterForNoteApp = require('../routers/routers');
const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }
  
  
module.exports = (server) =>{
    server.use(
        express.json(),
        cors(),
        helmet(),
        morgan('dev'),
       
    );
   
    server.use('/note', RouterForNoteApp);
    server.use(function(req, res, next){
      res.status(404);
    
      // respond with html page
      if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
      }
    
      // respond with json
      if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
      }
    
      // default to plain-text. send()
      res.type('txt').send('Not found');
    });
    server.set('etag', false) ;
    
    
}