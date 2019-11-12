const express = require('express');
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = process.env.NODE_ENV ? knex(knexConfig.production) : knex(knexConfig.development);
const { authenticate, generateToken } = require('../middleware.js');
const router = express.Router();

router.get("/", authenticate, (req, res) => {
    if (req.decoded.username === "admin") {
        db("notes")
            .then(notes => res.status(200).json(notes))
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            })
    } else {
        db("notes")
            .where({user_id: req.decoded.subject})
            .then(notes => res.status(200).json(notes))
            .catch(err => res.status(500).json({error: err}))
    }
})

router.get("/:id", authenticate, (req, res) => {
    let { id } = req.params;

    if (req.decoded.username === "admin") {
        db("notes")
        .where({id})
        .then(note => res.status(200).json(...note))
        .catch(err => res.status(500).json({error: err}))
    }

    db("notes")
        .where({id})
        .then(note => {
            if (note[0].user_id === req.decoded.subject) {
                res.status(200).json(...note);
            } else {
                res.status(401).json({error: "You do not have access to this note."});
            }
        })
        .catch(err => res.status(500).json({error: err}))
})

router.post("/", authenticate, (req, res) => {
    let { title, content } = req.body;

    if (!title) {
        return res.status(405).json({error: "Please enter a title."});
    }
    if (!content) {
        return res.status(405).json({error: "Please enter some content in the note."});
    }

    db("notes")
        .insert({ title, content, user_id: req.decoded.subject })
        .then(id => res.status(200).json(id))
        .catch(err => res.status(500).json({error: err}))
})

router.put("/:id", authenticate, (req, res) => {
    let { title, content } = req.body;
    let { id } = req.params;
    let user_id = req.decoded.subject;

    if (!title) {
        return res.status(405).json({error: "Please enter a title."});
    }
    if (!content) {
        return res.status(405).json({error: "Please enter some content in the note."});
    }

    db("notes")
        .where({ id })
        .first()
        .then(note => {
            if (note.user_id === user_id) {
                db("notes")
                    .where({
                        id
                    })
                    .update({
                        title,
                        content
                    })
                    .then(count => {
                        console.log(count);
                        count ?
                            res.status(200).json(count) :
                            res.status(400).json({
                                error: "Please enter a valid id"
                            });
                    })
                    .catch(err => res.status(500).json({
                        error: err
                    }))
            } else {
                res.status(401).json({error: "You do not have access to this note."});
            }
        })
})

router.delete("/:id", authenticate, (req, res) => {
    let { id } = req.params;
    let user_id = req.decoded.subject;

    db("notes")
        .where({ id })
        .first()
        .then(note => {
            if (note.user_id === user_id) {
                db("notes")
                    .where({
                        id
                    })
                    .del()
                    .then(count => {
                        count ?
                            res.status(200).json(count) :
                            res.status(400).json({
                                error: "Please enter a valid id"
                            });
                    })
                    .catch(err => res.status(500).json({
                        error: err
                    }))
            } else {
                res.status(401).json({error: "You do not have access to this note."});
            }
        })
})

module.exports = router;