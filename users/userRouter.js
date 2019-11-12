const express = require('express');
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = process.env.NODE_ENV ? knex(knexConfig.production) : knex(knexConfig.development);
const router = express.Router();

router.get("/", (req, res) => {
    db("users")
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({error: err}))
})

module.exports = router;