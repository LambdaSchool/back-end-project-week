const Notes = require('../models/NotesModel');
const User = require('../models/UserModels');
//gets all notes created by a user. route is /api/user/:id
const getNoteByUser = (req,res) => {
  const { id } = req.params;

  Notes.find({createdBy: id })
    .populate('createdBy', '-_id username')
    .then(userNotes => {
      res.json(userNotes)
    })
    .catch(err => {
      res.status(500).json({error: "unable to find users notes", err: err.message})
    })
}

const addShareUser = (req,res) => {
  const { noteId } = req.params;
  const { username } = req.body
  // console.log(noteId, username)
    User.findOneAndUpdate({username}, {$push: {notes: noteId}}, {new: true})
      .populate('notes', '-__v')
      .then(user => {
        res.status(201).json(user.notes)
        console.log(user)
      })
  // User.findOne({username})
  //   .then(({_id, notes}) => {
  //     const newSharedNotes = notes.concat(noteId)
  //     console.log(newSharedNotes)
  //   })
    .catch(err => {
      res.status(500).json({err:"something wrong with shared notes", msg: err.message})
    })
}

const getSharedNotes = (req,res) => {
  const { userId } = req.params;
  User.findById({_id:userId})
    .populate('notes', '-__v')
    .then(user =>{
      res.status(200).json(user.notes)
    })
    .catch(err => {
      res.status(500).json({err:"something wrong with shared notes", msg: err.message})
    })
}



module.exports = {
  getNoteByUser,
  addShareUser,
  getSharedNotes
} 