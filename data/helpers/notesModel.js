const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  getNoteActions,
};

function get(id) {
  let query = db("notes as n");

  if (id) {
    query.where("n.id", id).first();

    const promises = [query, getNoteActions(id)]; // [ notes, actions ]

    return Promise.all(promises).then(function(results) {
      let [note, actions] = results;

      if (note) {
        note.actions = actions;

        return mappers.noteToBody(note);
      } else {
        return null;
      }
    });
  } else {
    return query.then(notes => {
      return notes.map(note => mappers.noteToBody(note));
    });
  }
}

function getById(id) {
  return db('notes')
    .where({ id })
    .first();
}

// function insert(note) {
//   return db("notes")
//     .insert(note, "id")
//     .then(([id]) => get(id));
// }

async function insert(note) {
  const [id] = await db('notes').insert(note);

  return getById(id);
}

// function update(id, changes) {
//   return db("notes")
//     .where("id", id)
//     .update(changes)
//     .then(count => (count > 0 ? get(id) : null));
// }

function update(id, changes) {
  return db('notes')
    .where({ id })
    .update(changes, '*');
}

function remove(id) {
  return db("notes")
    .where("id", id)
    .del();
}

function getNoteActions(noteId) {
  return db("actions")
    .where("note_id", noteId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
}