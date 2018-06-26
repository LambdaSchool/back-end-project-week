const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Notes = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  note: {
    type: String,
    default: 'Add your fancy notes here.',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notes', Notes);
