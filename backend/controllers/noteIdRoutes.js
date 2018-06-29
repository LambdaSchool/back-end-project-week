const httpStatus = require('../utils/HTTPStatusCodes');
const { validateNotePostBody } = require('../utils/controllers/controllerHelpers');

module.exports = (usersModel, notesModel) => {
  return {
    "GET_ONE_BY_ID": (req, res) => {
      const id = req.params.id;
      const userId = req.plainToken._id;
      notesModel.findById(id)
        .then(note => {
          if (note === null) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }
          
          if (note.author == userId) {
            res.status(httpStatus.OK).json(note);
          } else {
            res.status(httpStatus.unauthorized).json({ error: "401: Unauthorized\nYou don't appear to have permission to view this note." });
          }
        })
        .catch(error => {
          console.log('noteRoutes--GET ERROR:',error);
          res.status(500).json(error);
        });
    },
    "PUT": async (req, res) => {
      const userId = req.plainToken._id;
      req.body.author = userId;

      const editedNote = validateNotePostBody(req.body);

      if (editedNote.errorState) {
        const { status, error } = editedNote;
        return res.status(status).json({ error });
      }

      const noteId = req.params.id;
      const configObj = {new:true}; // have result be the updated record, not the original
      
      await notesModel.findById(noteId)
        .then(note => {
          if (note === null) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }

          if (note.author != userId) {
            res.status(httpStatus.unauthorized).json({ error: "401: Unauthorized\nYou don't appear to have permission to view this note." });
            return;
          }

          notesModel.findByIdAndUpdate(noteId, editedNote, configObj)
            .then(noteB => {
              res.status(httpStatus.OK).json(noteB);
            })
            .catch(error => {
              console.log('noteRoutes--PUT ERROR:',error);
              res.status(500).json(error);
            });

        })
        .catch(error => {
          console.log('noteRoutes--PUT ERROR:',error);
          res.status(500).json(error);
        });

    },
    "DELETE": (req, res) => {
      const idOfNoteToDelete = req.params.id;
      const userId = req.plainToken._id;

      notesModel.findById(idOfNoteToDelete)
        .then(note => {
          if (note === null) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }

          if (note.author != userId) {
            res.status(httpStatus.unauthorized).json({ error: "401: Unauthorized\nYou don't appear to have permission to view this note." });
            return;
          }

          note.remove()
            .then(count => {
              if (count < 1) {
                res.status(500).json({ error: "500: Internal Server Error\nThe note could not be removed." });
                return
              }
              res.status(200).json({ "success": "Note successfully deleted." });
            })
            .catch(error => {
              console.log('noteIdRoutes--DELETE ERROR:', error);
              res.status(500).json({ error: "500: Internal Server Error\nThe note could not be removed." });
            });
        })
        .catch(error => {
          console.log('noteIdRoutes--DELETE ERROR:', error);
          res.status(500).json({ error: "500: Internal Server Error\nThe note could not be removed." });
        });
    },
    "SHARE": (req, res) => {
      const { email, share } = req.body;
      const  idOfNote = req.params.id;
      const userId = req.plainToken._id;

      notesModel.findById(idOfNote)
        .then(note => {
          if (note === null) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }

          if (note.author != userId) {
            res.status(httpStatus.unauthorized).json({ error: "401: Unauthorized\nYou don't appear to have permission to view this note." });
            return;
          }
          
          usersModel.findOne({ email })
            .then(user => {
              
              if (user === null) {
                res.status(httpStatus.notFound).json({ error: "404: Not Found\nNo user with that e-mail was found." });
                return;
              }

              console.log("BEFORE:",note);
              console.log("SHARE:",share);
              if (share) {
                note.collaborators = [...note.collaborators, user._id];
              } else {
                const result = note.collaborators.filter(x => {
                  /* Note to self:
                  If you want to do comparisons between IDs, remember to use .equals(). This will convert BSON objectIDs to comparable values.
                  Normal comparisons will NOT work
                  */
                  console.log(x,"!=",user._id, !x.equals(user._id), !user._id.equals(x));
                  return !x.equals(user._id);
                });
                console.log("RESULT:",result);
                note.collaborators = result;
              }

              note.save()
                .then(count => {
                  console.log("AFTER:",count);
                  if (count < 1) {
                    res.status(500).json({ error: "Could not share note with user." });
                    return;
                  }
                  res.status(httpStatus.OK).json({ "Success" : "Successfully shared note with user. "});
                })
                .catch(error => {
                  console.log('noteIdRoutes--SHARE ERROR:',error);
                  res.status(500).json(error);
                });
    
              // notesModel.update({ _id: idOfNote }, { $push: { collaborators: user._id }})
              //   .then(() => {
              //     res.status(httpStatus.OK).json({ "Success" : "Successfully shared note with user. "});
              //   })
              //   .catch(error => {
              //     console.log('noteIdRoutes--SHARE ERROR:',error);
              //     res.status(500).json(error);
              //   });
              
            })
            .catch(error => {
              console.log('noteIdRoutes--SHARE ERROR:',error);
              res.status(500).json(error);
            });
        })
        .catch(error => {
          console.log('noteIdRoutes--SHARE ERROR:',error);
          res.status(500).json(error);
        });
    },
  };
};