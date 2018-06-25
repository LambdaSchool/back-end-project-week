const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Notes = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unqiue: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Notes', Notes)