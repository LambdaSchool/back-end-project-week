const Passport = require('passport')
const { 
  createUser, 
  login,
  newNote, 
  getNoteById,
  getNoteByUser,
  deleteNote,
  editNote,
  addShareUser,
  getSharedNotes
} = require('../controllers');

const { localStrategy, ppJwt } = require('../middleware/Auth-Middleware');

Passport.use(localStrategy);
Passport.use(ppJwt);

const passportOptions = { session: false };
const authenticate = Passport.authenticate('local', passportOptions);
const doWeHaveAToken = Passport.authenticate('jwt', passportOptions);

module.exports = server => {
  server.route('/api/users').post(createUser);  
  server.route('/api/login').post(authenticate, login)


  // routes by user
  server.route('/api/user/:id').get(doWeHaveAToken, getNoteByUser)
  server.route('/api/sharedNotes/:noteId').put(addShareUser)
  server.route('/api/sharedNotes/:userId').get(getSharedNotes)

  // routes by note
  server.route('/api/note').post(newNote);
  server.route('/api/note/:id')
    .get(doWeHaveAToken, getNoteById)
    .delete(doWeHaveAToken, deleteNote)
    .put(doWeHaveAToken, editNote);

}