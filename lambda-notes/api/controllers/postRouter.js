const express = require('express');
const mongoose = require('mongoose');

const postModel = require('../models/postSchema.js');

const postRouter = express.Router();

const createPost = (req, res) => {
    const postInfo = req.body;
    const post = new postModel(postInfo);
    post
    .save()
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while adding the post.` });
    })
};


const getPosts = (req, res) => {
    postModel.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while getting the posts.` });
      });
};

const getPostById = (req, res) => {
    const { id } = req.params;
    postModel.findById()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while getting the post.` });
      });
};

const updatePostById = (req, res) => {
    const { id } = req.params;
    const postInfo = req.body;

    postModel.findByIdAndUpdate()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while updating the post.` });
      });
};


module.exports = { postRouter, getPosts, createPost, getPostById, updatePostById };