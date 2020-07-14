// Router Model to keep things easy and readable
const express = require("express")
const router = express.Router();
const notes = require('../helpers/notesModel')

// To get all the notes
router.get('/get/all', (req, res) => {

 notes.fetchAll()
     .then(notes => {
         res.status(200).json(notes)
        })
        .catch(err =>{
            res.status(500).send(err)
        })

})

//To get a single note by id

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    await notes.fetchNote(id)
        .then(note => {
            note
                ? res.status(200).json(note)
                : res.status(400).json({error: "The note does not exist"})
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

// Creating a new note
router.post('/create', async (req, res) => {
    const { note } = req.body;

        await notes.add(req.body)
            .then(note => {
                res.status(201).json(note)
            })
            .catch(err => {
                res.status(500).send(err)
            })
})

//Deleting an existing note
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    notes.remove(id)
        .then(count => {
            count
                ? notes.fetchAll().then(note => {
                    res.status(200).json(note)
                })
                : res.status(404).json(({ error: "Invalid Id" }))
        })
})


//Updating a note and checking if that note is too long
router.put('/edit/:id', (req, res) => {
    const { id } = req.params
    const updatedNote  = req.body;
        notes.update(id, updatedNote).then(count => {
            count ? notes.fetchNote(id).then(note => {
                res.json(note)
            })
                : res.status(404).json({ error: "The id you are looking for is not found" })
        })
            .catch(err => {
                res.status(500).json({ error: "Can not update this note" })
            })

})
module.exports = router;