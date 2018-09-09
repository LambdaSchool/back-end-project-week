const Notes = require('../models/NotesModel')

//creates a new note. route is /api/note
const newNote = (req, res) => {
  const { title, body, createdBy } = req.body;

  Notes.create({ title, body, createdBy })
    .then(note => {
      
      res.status(201).json(note)
      
    })
    .catch(err => {
      res.status(500).send(err.message)
    });
};

//gets a note by the note id.  route is /api/note/:id
const getNoteById = (req, res) => {
  const { id } = req.params;
  
  Notes.findById(id)
    .populate('createdBy', '-_id username')
    .then(note => {
      if(note){
        res.json(note)
      }else{
        res.json({error: `${id} is correct lengh but not a note`})
      }
      
      
    })
    .catch(err => {
      console.log(id)
      res.status(500).json({error: "unable to get note", err: err.message})
    })
}

const deleteNote = (req, res) => {
  const { id } = req.params;

  Notes.findByIdAndRemove(id)
    .then(note => {
      if(note){
        res.json(note)
      }else{
        res.json({error: `${id} is not a note`})
      }
    })
    .catch(err => {
      res.status(500).json({error: "unable to delete", err: err.message})
    })
}

const editNote = (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  Notes.findByIdAndUpdate(id, {title, body}, { runValidators: true })
    .then(note => {
      if(note){
        res.json(note)
      }else{
        res.json({error: `${id} is not a note`})
      }
    })
    .catch(err => {
      res.status(500).json({error: "unable to delete", err: err.message})
    })
}





module.exports = {
  newNote,
  getNoteById,
  deleteNote,
  editNote
  
}