const { Router } = require('express');

const camelToSnake = require('../utils/camelToSnake');
const HttpError = require('../utils/HttpError');

function makeRoute(db) {
  const route = Router();

  const cols = ['id', 'title', 'text_body', 'created_at', 'user_id', 'left', 'right'];
  const appendCols = cols.map(col => `notes.${col}`);

  // helper function: add tags
  const addTagsToDB = (noteId, tags) => new Promise((resolve) => {
    if (tags && tags.length > 0) {
      // creates transaction to handle creation of new tags in tag database
      // if needed, and to create note tag mappings
      // on notesTagsJoin table
      return db
        .transaction((trx) => {
          // create new tags if they don't exist in tags database
          const tagPromises = tags.map(name => db('tags')
            .transacting(trx)
            .select('id')
            .where('name', '=', name)
            .first()
            .then((existingId) => {
              // handle id for existing tags
              if (existingId) {
                return [existingId.id];
              }
              // handle tags that need to be created
              return db('tags')
                .transacting(trx)
                .insert({ name })
                .returning('id');
            }));
          return (
            Promise.all(tagPromises)
            // create note-tag mappings in notesTagsJoins database
              .then((tagIds) => {
                const mappings = tagIds.map(([tagId]) => ({ noteId, tagId }));
                return db('notesTagsJoin')
                  .transacting(trx)
                  .insert(mappings);
              })
              .then(() => trx.commit())
              .catch(() => trx.rollback())
          );
        })
        .then(() => resolve(noteId))
        .catch((err) => {
          console.log(`warning: note was created but an error occurred in tag creation: ${err}`);
          return resolve(noteId);
        });
    }
    return resolve(noteId);
  });

  // helper function: cleans orphan tags in tags table that no longer have any relations to a note
  const cleanTags = () => db('notesTagsJoin')
    .select('tagId')
    .distinct('tagId')
    .then((tags) => {
      const tagIds = tags.map(tag => tag.tagId);
      return db('tags')
        .whereNotIn('id', tagIds)
        .del();
    })
    .catch((err) => {
      console.log(err);
      return 0;
    });

  route.get('/get/all', (req, res, next) => {
    const camelCaseCols = cols.map((col, index) => {
      const processed = col.replace(/_([a-z])/, match => match[1].toUpperCase());
      return cols[index] === processed
        ? `ordered.${processed}`
        : `ordered.${cols[index]} AS "${processed}"`;
    });
    const string = `WITH RECURSIVE ordered AS (
        SELECT * FROM notes WHERE notes.left = -1
        UNION ALL 
        SELECT ${appendCols.join(', ')} FROM notes
        INNER JOIN ordered ON notes.left = ordered.id)
        SELECT ${camelCaseCols.join(', ')} FROM ordered;`;
    // get all notes from notes table
    db.raw(string)
      .then(({ rows: notes }) => {
        // get all tags for each note and add to note object
        const promiseNotes = notes.map(
          note => new Promise((resolve) => {
            db('notesTagsJoin')
              .select(['name', 'notesTagsJoin.tagId as id'])
              .where('id', '=', note.id)
              .join('tags', 'notesTagsJoin.tagId', 'tags.id')
              .then(tags => resolve({ ...note, tags }))
              .catch(() => resolve(note));
          }),
        );
        return Promise.all(promiseNotes);
      })
      .then(preppedNotes => res.status(200).json(preppedNotes))
      .catch(() => next(new HttpError(404, 'Database did not supply requested resources.')));
  });

  route.get('/get/:id', (req, res, next) => {
    const camelCaseCols = cols.map((col, index) => {
      const processed = col.replace(/_([a-z])/, match => match[1].toUpperCase());
      return cols[index] === processed
        ? `notes.${processed}`
        : `notes.${cols[index]} AS ${processed}`;
    });
    const id = Number(req.params.id);
    if (id) {
      return Promise.all([
        // get note from notes table
        db('notes')
          .select(camelCaseCols)
          .where('id', '=', id)
          .first(),
        // get associated tags from tag table
        db('notesTagsJoin')
          .select(['name', 'notesTagsJoin.tagId as id'])
          .innerJoin('tags', 'notesTagsJoin.tagId', 'tags.id')
          .where('noteId', '=', Number(id)),
      ])
        .then(([note, tags]) => {
          if (note) {
            // return note with tags array included
            return res.status(200).json({ ...note, tags });
          }
          throw new HttpError(404, 'Database did not return a resource for this id.');
        })
        .catch(() => {
          next(new HttpError(404, 'Database could not return a resource with the id provided'));
        });
    }
    return next(new HttpError(404, 'A usable id parameter was not received for this request.'));
  });

  route.post('/create', (req, res, next) => {
    const {
      body: { tags, ...note },
    } = req;
    // Checks that a non-empty title is included, returns error if not
    if (!note.title || note.title === '') {
      return next(new HttpError(400, 'Must provide a non-empty title for this request.'));
    }
    // inserts new note in note table
    return db('notes')
      .select('id')
      .where('right', '=', '-1')
      .first()
      .then(
        ({ id }) => new Promise((resolve) => {
          let newId;
          return db.transaction(trx => db('notes')
            .transacting(trx)
            .where('id', '=', id)
            .update({ right: db.raw('NULL') })
            .then(() => db('notes')
              .transacting(trx)
              .insert({
                ...camelToSnake(note),
                left: id,
                right: -1,
                user_id: 1,
              })
              .returning('id'))
            .then(([leftId]) => {
              newId = leftId;
              return db('notes')
                .transacting(trx)
                .where('id', '=', id)
                .update({ right: newId });
            })
            .then(() => {
              return trx.commit().then(() => {
                return resolve(newId);
              });
            })
            .catch(() => {
              trx.rollback().then(() => resolve());
            }));
        }),
      )
      .then((noteId) => {
        if (!noteId) {
          throw new HttpError(500, 'Database did not create a new instance');
        }
        // handles adding of tags to tags and notesTagsJoin table
        return addTagsToDB(noteId, tags);
      })
      .then(id => res.status(201).json({ id }))
      .catch((err) => {
        if (err instanceof HttpError) {
          return next(err);
        }
        return next(
          new HttpError(
            403,
            'Database was not able to create a new instance. Resource may violate database constraint',
          ),
        );
      });
  });

  route.delete('/delete/:id', (req, res, next) => {
    const id = Number(req.params.id);
    // deletes note in notes table
    return db
      .transaction(trx => db('notesTagsJoin')
        .transacting(trx)
        .where('noteId', '=', id)
        .del()
        .then(cleanTags)
        .then(() => db('notes')
          .transacting(trx)
          .where('id', '=', id)
          .del())
        .then(() => db('notes')
          .transacting(trx)
          .where('right', '=', id)
          .update({ right: -1 }))
        .then(trx.commit)
        .catch(() => trx.rollback)
        .then(() => {
          throw new HttpError(406, 'An error occurred when making changes to the database.');
        }))
      .then((response) => {
        if (response === 0) {
          throw new HttpError(404, 'Requested resource could not be found in database for deletion.');
        }
        return res.status(204).end();
      })
      .catch((err) => {
        if (err instanceof HttpError) {
          return next(err);
        }
        return next(new HttpError(404, 'Database could not complete deletion request.'));
      });
  });

  route.put('/edit/:id', (req, res, next) => {
    // checks for an acceptable title change
    if (req.body.title === '') {
      throw new HttpError(400, 'Cannot edit a note to have an empty string as title.');
    }

    const noteId = Number(req.params.id);
    const { tags, ...note } = req.body;

    // Creates promise to update fields on notes where necessary
    let notePromise;
    if (note) {
      notePromise = db('notes')
        .where('id', '=', noteId)
        .update(camelToSnake(note))
        .catch((err) => {
          console.log(err);
          return 0;
        });
    } else {
      notePromise = Promise.resolve(0);
    }

    // Creates promise to handles creation and deletion of tags as indicated
    const tagPromise = db('notesTagsJoin')
      .select('tags.id')
      .where('notesTagsJoin.noteId', '=', noteId)
      .join('tags', 'tags.id', 'notesTagsJoin.tagId')
      .then((dbTags) => {
        const tagIds = dbTags.map(tag => tag.id);
        return db('notesTagsJoin')
          .whereIn('tagId', tagIds)
          .del();
      })
      .then(() => addTagsToDB(noteId, tags))
      .then(cleanTags)
      .catch(err => console.log(err));

    // Waits for both promises to complete, then handles response to client
    return Promise.all([notePromise, tagPromise])
      .then(([editedNum]) => {
        if (editedNum > 0) {
          return res.status(204).end();
        }
        throw new HttpError(404, 'Requested resource could not be found in database for editing.');
      })
      .catch((err) => {
        if (err instanceof HttpError) {
          return next(err);
        }
        return next(new HttpError(500, 'Database could not complete edit request.'));
      });
  });

  route.get('/tags', (req, res, next) => db('tags')
    .select()
    .then(tags => res.status(200).json(tags))
    .catch(() => next(new HttpError(500, 'Database error occurred when fetching tags'))));

  // Error handling middleware
  route.use((err, req, res, next) => {
    if (err instanceof HttpError) {
      const { code, message } = err;
      return res.status(code).json({ message });
    }
    return res.status(404).json('The requested resource could not be found.');
  });

  route.put('/move', (req, res, next) => {
    const { sourceId, dropId } = req.body;

    if (sourceId === dropId) {
      return res.status(200).end();
    }

    return db
      .select(['notes.left', 'notes.right'])
      .from('notes')
      .where('id', '=', sourceId)
      .first()
      .then(({ left: leftOfSource, right: rightOfSource }) => {
        return db.transaction((trx) => {
          // handle deletion logic
          const promises = [];
          let handleSourceLeft;
          let handleSourceRight;
          if (leftOfSource === -1) {
            // logic when Source is at extreme left
            handleSourceRight = db('notes')
              .transacting(trx)
              .update({ left: -1 })
              .where('id', '=', rightOfSource);
            promises.push(handleSourceRight);
          } else if (rightOfSource === -1) {
            // logic when Source is at extreme right
            handleSourceLeft = db('notes')
              .transacting(trx)
              .update({ right: -1 })
              .where('id', '=', leftOfSource);
            promises.push(handleSourceLeft);
          } else {
            // logic when Source is between extreme right and left
            handleSourceLeft = db('notes')
              .transacting(trx)
              .update({ right: rightOfSource })
              .where('id', '=', leftOfSource);
            promises.push(handleSourceLeft);

            handleSourceRight = db('notes')
              .transacting(trx)
              .update({ left: leftOfSource })
              .where('id', '=', rightOfSource);
            promises.push(handleSourceRight);
          }
          return (
            Promise.all(promises)
            // Insertion Logic
            // obtain left property of drop target
              .then(() => db('notes')
                .transacting(trx)
                .select('left')
                .where('id', '=', dropId)
                .first())
              .then(({ left: leftOfDrop }) => {
                const secondPromises = [];

                // set right property of note left of drop target to point to source
                const handleDropLeft = db('notes')
                  .transacting(trx)
                  .update({ right: sourceId })
                  .where('id', '=', leftOfDrop);
                secondPromises.push(handleDropLeft);

                // set left property of drop target to point to source
                const handleDrop = db('notes')
                  .transacting(trx)
                  .update({ left: sourceId })
                  .where('id', '=', dropId);
                secondPromises.push(handleDrop);

                // set left property of source to point to drop target's former left property
                // and point its right property to point to drop target
                const handleSource = db('notes')
                  .transacting(trx)
                  .update({ left: leftOfDrop, right: dropId })
                  .where('id', '=', sourceId);
                secondPromises.push(handleSource);

                return Promise.all(secondPromises);
              })
              .then(trx.commit)
          );
        });
      })
      .then(() => res.status(200).end())
      .catch((err) => {
        console.log(err);
        return next(new HttpError(500, 'Database error prevented the transaction from completing.'));
      });
  });


  return route;
}

module.exports = makeRoute;