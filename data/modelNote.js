const knex = require('knex');
const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);


module.exports={

	addNote: function(note) {
		return db('notes')
			.insert(note)
			.then(id => id);
	},

	getNote: function(noteId) {
		return db('notes')
			.where({ id: noteId })
			.then(note => note);
    },
    getNotes:function(){
        return db.select('*').from('notes')
    },
    editNote:function(modifiedNote,idPassed){
        return db('notes')
		.where({ id: idPassed })
		.update(modifiedNote)
		.then(numberUpdated => numberUpdated)
    },
    deleteNote:function(NoteId){
        return db('notes').where({id:NoteId})
        .delete()
        .then(numDeleted=>numDeleted)      
    }
};