const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: Array,
    default: [],
  }
});

User.pre('save', function (next) {
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

User.methods.isPasswordValid = function (passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

User.methods.addNote = function (note) {
  this.note.push(note);
};


module.exports = mongoose.model('User', User);