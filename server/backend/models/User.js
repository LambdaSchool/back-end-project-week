const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validators = require('../utils/Validate');
const { hashPassword, validatePassword } = require('../utils/bycrytHash');
// General Definitions
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validators.email,
      message: '{VALUE} is not a valid e-mail address!'
    }
  },
  password: {
    type: String,
    required: true
  },
  pref: {
    theme: {
      type: String,
      default: 'default',
      enum: ['default', 'dark']
    }
  },
  notes: [{ type: ObjectId, ref: 'Note' }]
});

UserSchema.pre('save', hashPassword);

UserSchema.methods.validatePassword = validatePassword;

module.exports = mongoose.model('User', UserSchema);