// **CONNECTION TO OUR DB (production)***
const knex = require('knex');
const dbEngine = process.env.DB || 'development';
// add DB to point to production on heroku
const config = require('../knexfile.js')[dbEngine];
//const db= require('knex')(config);
const tbl = 'NoteTable';
const db= knex(config);

/*// **CONNECTION TO OUR DB development***
const knex = require('knex');
const knexConfing = require('../knexfile.js');
const db = knex(knexConfing.development);
const tbl = 'NoteTable';
*/

// GET ALL NOTES HANDLER

const getAllNotes =(req,res)=>{
    db(tbl).then(notes =>{
        if(notes){
            res.status(200).json(notes)
        }
        else{
            res.status(405).json({errorMessage : 'No note yet stored in the Database'})
        }})
        .catch(err =>{res.status(500).json(err)})
}

// GET A NOTE HANDLER

const getNotebyId  =(req,res)=>{
    const {_id} = req.params
    db(tbl)
    .where({_id})
    .then(note => {
        if(note.length !== 0){
            res.status(200).json(note)
        }
        else{
            res.status(404).json({errorMessage :'HOOOPS NOT FOUND !!!'})
        }
        
    }).catch(err =>{res.status(500).json(err)})
}


// CREATE A NOTE HANDLER

const CreateNewNote  = (req,res)=> {
    const newNote = req.body;
    if(newNote.title && newNote.textBody){
        db(tbl)
        .insert(newNote)
        .then(_id => {
                res.status(200).json(`Success, new note created with id :${_id}`)
            })
        .catch(err =>{res.status(500).json(err)})
    }
    
        else{
            res.status(450).json({errorMessage :'Hoops, all fields are required'})
        }
}



// EDIT OR UPDATE A NOTE HANDLER

const UpdateNote  = (req,res)=>{
    const eDITNote = req.body;
    const {_id} = req.params
    if(eDITNote.title && eDITNote.textBody){
        db(tbl)
        .where({_id})
        .then(note => {
            if(note.length !== 0){
                db(tbl)
                .where({_id})
                .update(eDITNote)
                .then(note => {
                        res.status(200).json(`Success,${note} note updated with id :${_id}`)
                    })
                .catch(err =>{res.status(500).json(err)})
            }
            else{
                res.status(404).json({errorMessage :'HOOOPS NOT FOUND !!!'})
            }})}
    
        else{
            res.status(450).json({errorMessage :'Hoops, all fields are required'})
        }
}


// GET A NOTE HANDLER

const DestroyNote  =(req,res)=>{
    const {_id} = req.params
    db(tbl)
    .where({_id})
    .then(note => {
        console.log(note)
        if(note.length !== 0){
            db(tbl)
            .where({_id}).del()
            .then(count =>{
                res.status(200).json(`Success,${count} note deleted with id :${_id}`)
                    })
               
               
        }
        else{
            res.status(404).json({errorMessage :'HOOOPS NOT FOUND !!!'})
        }
        
    }) .catch(err =>{res.status(500).json(err)}) 
}
/*
// ****Easiest route pre-test****
 const notes = [
     {
    "tags": ["tag", "otherTag"],
    "title": "Note Title",
    "textBody": "Note Body",
    }]
    const testRoute = (routename) =>{
        return(req, res) =>{
            // just for sipmle test
          res.json({notes,routename:[routename]})
    } 
    }  
  const getNotebyId = testRoute('getNotebyId') ;  
  const getAllNotes = testRoute('getAllNotes') ;    
  const CreateNewNote = testRoute('CreateNewNote') ;    
  const DestroyNote  = testRoute('DestroyNote') ;      
  const UpdateNote= testRoute(' UpdateNote') ; 
*/

module.exports = {
    getNotebyId,      
    getAllNotes,      
    CreateNewNote,     
    DestroyNote,       
    UpdateNote         
    
  }