const express = require('express')
const router = express.router()
const bcrypt = require('bcryptjs')
const userDB = require('../DB-Functions/User-Functions')

router.post('/', (req, res) => {
 const user = req.body
 const pw_hash = bcrypt.hashSync(user.password, 16)
 user.password = pw_hash 
 userDB.register(user)
  .then((ids) => {
   res
    .status(201)
    .json({message: "You have successfully registered an account."}, {id: ids[0]})
  })
  .catch((err) => {
   res
    .status(500)
    .json({error: "Error registering user."})
  })
})

module.exports.router