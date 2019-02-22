const express = require('express');
const jwt = require('jsonwebtoken')

const router = express.Router()

const notes = require('../../notes/notesModel')
const secret = process.env.SECRET ||'the-future-is-unknown'

function protected(req, res, next) {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({errMessage: "invalid token"})
      } else {
        next()
      }
    })
  } else {
    res.status(401).json({errMessage: "no token attached"})
  }
}


router.get('/notes/:id', protected, async (req, res) => {
  console.log(req.params)
  const {id} = req.params
  console.log(id)
  try {
    const allNotes = await notes.getAllNotes(id)
    res.status(200).json(allNotes)  
  } catch (error) {
    res.status(500).json({failure: 'unable to get all the notes'})
  }
})

router.get('notes/:id/note/:id', protected, async (req, res) => {
  const { id } = req.params;
  try {
    let note = await notes.getNoteByID(id)
    note = note[0];
    res.status(200).json(note)
  } catch (error) {
    res.status(500).json({failure: 'unable to get the note'})
  }
})

router.post('notes/:id/note/create', protected, async (req, res) => {
  const {title, content} = req.body

  if(title && content) {
    try {
      await notes.createNote(req.body)
      res.status(201).json({success: "the note has been added"})
    } catch (error) {
      res.status(500).json({failure: "unable to create the note"})
    }
  } else {
    res.status(422).json({failure: "please add the title or the content"})
  }
})

router.put('notes/:id/note/:id/edit', protected, async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body

  if (title && content ) {
    try {
      await notes.updateNote(id, req.body)
      res.status(201).json({success: "the note has been updated"})
    } catch (error) {
      res.status(500).json({failure: 'unable to update the note'})
    }
  } else {
    res.status(422).json({failure: 'please make sure to add a title and content'})
  }
})

router.delete('notes/:id/note/:id/delete', protected, async (req, res) => {
  const { id } = req.params

  try {
    await notes.deleteNote(id)
    res.status(200).json({success: "the note has been deleted"})
  } catch (error) {
    res.status(500).json({failure: 'unable to delete the note'})
  }
})

module.exports = router