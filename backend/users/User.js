const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SALT_ROUNDS = 11;

const User = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },

      password: {
        type: String,
        required: true,
        minlength: 4,
      }
});

User.pre('save', function(next) {
  return bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then(hash => {
      this.password = hash
      return next()
    })
    .catch(err => {
      return next(err)
    })
});

User.methods.validatePassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', User);