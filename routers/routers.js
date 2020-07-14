const express = require('express');
const RouterNote = express.Router();
const TaskManager = require('../taskmanager/taskmanager');


// ** ROUTERS FOR OUR LAMBDA NOTES APP ** //

// ## GET ALL NOTES
RouterNote.get('/get/all',TaskManager.getAllNotes);

// ## GET A NOTE
RouterNote.get('/get/:_id',TaskManager.getNotebyId);

// ## CREATE A NOTE/create
RouterNote.post('/create',TaskManager.CreateNewNote);

// ## EDIT A NOTE
RouterNote.put('/edit/:_id',TaskManager.UpdateNote);

// ## DELETE A NOTE
RouterNote.delete('/delete/:_id',TaskManager.DestroyNote);

module.exports = RouterNote;
