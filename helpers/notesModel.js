
//Notes CRUD model
const db = require('../config/dbConfig')


module.exports = {

 fetchAll: () => {
        return db('notes')
    },
 fetchNote: (id) => {
        return db('notes')
            .where({ id })
            .first()
    },

 add:  (note) => {
        return db('notes')
            .insert(note)
    },

 update: (id, note) => {
        return db('notes')
            .where({ id })
            .update(note)
    },
 remove: (id) => {
        return db('notes')
            .where({ id })
            .del()
    }



}