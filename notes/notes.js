const db = require('../data/dbConfig.js');

module.exports = {
   getAll,
   findById,
   insert,
   update,
   remove,
};

async function getAll() {
   return db("notes");
}

async function findById(id) {
   return db("notes").where("id", id);
}

async function insert(note){
   return db("notes").insert(note);
}
async function update(id, note){
   return db("notes").where("id", id).update(note);
}
async function remove(id){
   return null;
}