const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ObjectId } = mongoose.Schema.Types;

const definition = {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10 // make this at least 12 in production 
    },
    notes: [{ type: ObjectId, ref: 'Note' }]
}

const options = {
    timestamp: true,
}

const userSchema = new mongoose.Schema(definition, options);

userSchema.pre('save', function (next) { // this has to be a regular function, can not be arrow function 
    bcrypt
        .hash(this.password, 10)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

userSchema.methods.validatePassword = function (passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password); // this returns a promise, which will be handled in the userRoutes
}


module.exports = mongoose.model('User', userSchema);