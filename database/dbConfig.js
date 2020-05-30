const knex = require('knex');

const knexConfig = require('../knexfile.js');

 db = knex(knexConfig.development);

 module.exports = {
    getAll: () =>{
        return db('notes');
    },

    findById:(id)=>{
        return db('notes').where({id}).first();
    },

    insert: (note)=>{
        return db('notes').insert(note);
    },
    update: (id, note) =>{
        return db('notes').where({ id }).update(note);
    },

    remove: (id)=>{
        return db('notes').where({id}).del();
    }
 }