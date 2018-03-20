const mongoose = require('mongoose');

require('./UserModel');

const NoteSchema = new mongoose.Schema({

	title: {
		type: String,
		required: true,
		index: true
	},
	text: {
		type: String
	},
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	cretedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
