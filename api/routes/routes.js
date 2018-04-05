const { authenticate } = require('../utils/middleswares');

const { 
  getNotes, 
  editNote, 
  createNote, 
  deleteNote
} = require('../controllers/notes');

const {
  login
} = require('../controllers/login');

const {
  createUser
} = require('../controllers/user');

module.exports = server => {
  server.get('/api/notes', authenticate, getNotes);
  server.post('/api/signup', createUser);
  server.post('/api/login', login);
  server.post('/api/new', authenticate, createNote);
  server.put('/api/edit/:id', authenticate, editNote);
  server.delete('/api/delete/:id', authenticate, deleteNote);
};