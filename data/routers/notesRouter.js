const express = require('express');

const Notes = require("../helpers/notesModel.js");

const router = express.Router();

router.get('/', (req, res) => {
    Notes.get()
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error finding notes' });
    });
});

// router.get('/:id', (req, res) => {
//     Notes.get(req.body)
//   .then((note) => {
//     res.status(200).json(note);
//   })
//   .catch((err) => {
//     res.status(500).json({ message: 'Error finding notes' });
//   });
// });
  
router.post('/', (req, res) => {    
    Notes.insert(req.body)
    .then(note => {res.status(201).json(note);})    
    .catch(() => {
      res.status(500).json({ message: 'Error adding note to the database' })
    })
});

router.get('/:id', (req, res) => {
  Notes.getById(req.params.id)
  .then(note => {
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the note',
    });
  });
});

router.put('/:id', (req, res) => {
    Notes.update(req.params.id, req.body)
      .then((note) => {
        if (note) {          
              res.status(200).json({ message: 'The note has been updated' });
        } else {
          res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
      })
      .catch((error) => {      
        console.log(error);
        res.status(500).json({
          message: "The note information could not be modified.",
        });
      });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Notes.remove(id)
      .then((note) => {
        if (note) {
          res.status(200).json({ message: "note deleted" });
        } else {
          res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "The note could not be removed" });
      });
  });

router.get('/:id/actions', (req, res) => {    
    Notes.getNoteActions(req.params.id)
      .then((action) => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: "Action not found" });
        }
      })
      .catch((error) => {      
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the action",
        });
      });
});

module.exports = router;