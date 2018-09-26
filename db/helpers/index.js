const knex = require("knex");
require('dotenv').config()
const dbEngine = process.env.DB || "development";
const dbConfig = require("../../knexfile")[dbEngine];

const db = knex(config);

module.exports = {
  getNotes: function(id) {
    let query = db("notes");

    if (id) {
      return query
        .where(id)
        .first()
        .then(note => note);
    } else {
      return query.then(notes => notes);
    }
  },

  createNote: function(body) {
    let query = db("notes");

    return query
      .insert(body)
      .into("notes")
      .then(id => id);
  },

  editNote: function(id, body) {
    let query = db("notes");

    return query
      .where(id)
      .update(body)
      .then(body => body);
  },

  deleteNote: function(id) {
    let query = db("notes");

    return query
      .where(id)
      .del()
      .then(count => count);
  }
};
