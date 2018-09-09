const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const NotesSchema = new Schema({
  
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  body: {
    type: String,
    required: true,
    minlength: 15,
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
 
})


module.exports = mongoose.model('Note', NotesSchema)