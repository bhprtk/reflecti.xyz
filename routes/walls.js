'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

// ALBUM ROUTES
router.route('/')
  .get(User.authorization(), (req, res) => {
    Album.find({}).populate('_owner _images', 'username username')
      .exec(res.handler);
  })
  .post(User.authorization(), (req, res) => {
    Album.new(req.user._id, req.body, res.handler);
  });

router.route('/:id')
    .get(User.authorization(), (req, res) => {
      Album.findOne({ _id: req.params.id }).populate('_owner _images', 'username username')
        .exec(res.handler);
    })
    .post(User.authorization(), (req, res) => {
      Album.edit(req.user._id, req.params.id, req.body, res.handler);
    })
    .delete(User.authorization(), (req, res) => {
      Album.delete(req.user._id, req.params.id, res.handler);
    });

module.exports = router;
