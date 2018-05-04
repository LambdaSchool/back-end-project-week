const express = require("express");
const router = express.Router();

const User = require("../api/models/userModel.js");

router.get('/users', (req, res) => {
    User
    .find({})
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ err: 'Could not display User' })
    })
})

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    newUser
    .save()
    .then(newuser => {
        res.status(200).json(newuser)
    })
    .catch(err => {
        res.status(422).json({ err: 'Could not create new User...' });
    })

})

module.exports = router;