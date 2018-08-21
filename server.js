const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const db = require('./data/db')

const server = express();
server.use(bodyParser.json());//put bodyparser instead of express
server.use(cors())

server.get('/', (req, res) => {
    res.send('up and running... LambdaNotes')
});
// server.get('/api/hello', (req, res) => {
//     res.send({ express: 'Hello From Express' });
//   });

server.get('/api/notes', (req, res) => {
    db('notes').then(note => {
        res.status(200).json(note)
    }).catch(err => res.status(500).json(err))
});

server.post('/api/notes', (req, res) => {
    console.log(req.body)
    const note = req.body;
    // const { title, content } = req.body;
    // const note = { title, content };
    // if (!name || !age || !height) {
    //     return sendUserError(
    //       'Ya gone did smurfed! Name/Age/Height are all required to create a smurf in the smurf DB.',
    //       res
    //     );
    //     if (!name || !age || !height) {
    //         return sendUserError(
    //           'Ya gone did smurfed! Name/Age/Height are all required to create a smurf in the smurf DB.',
    //           res
    //         );
    db.insert(note).into('notes').then(notes =>{//changed note to newNote
        const id = notes[0];
        res.status(201).json({id, ...note})
    }).catch(err => res.status(500).json(err))
})

server.delete('/api/notes/:id', (req, res) => {//delete user
    const id = req.params.id;
    // posts = posts.filter(p => p.id != id)
    db('notes')
    .where('id', '=', id)
    .del()
      .then(note => {
        if (note === 0) {
          res.status(404)
          .json({ error: "The u with the specified ID does not exist." })
        }
        res.status(200).json(note)
      }).catch(error => {
        res.status(500)
          .json({ error: "error 2." })
      });
  })

const port = 6500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});