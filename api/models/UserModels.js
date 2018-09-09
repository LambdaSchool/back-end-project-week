const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{
    type: ObjectId,
    ref: 'Note'
  }]

})

UserSchema.pre('save', function(next) {
  return bcrpyt
    .hash(this.password, 12)
    .then(hash => {
      this.password = hash;
      return next()
    })
    .catch(err => {
      return next(err)
    })
})


UserSchema.methods.checkPassword = function(plainTextPW) {
  return bcrpyt.compare(plainTextPW, this.password)
}

module.exports = mongoose.model('User', UserSchema)