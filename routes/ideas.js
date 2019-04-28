const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea Index Page
router.get('/', (req, res) => {
  Idea.find()
    .sort({date:'desc'})
    .then(ideas => {
      res.render('index', {
        ideas:ideas
      });
    });
});

// Add Idea Form
router.get('/add', (req, res) => {
  res.render('index');
});

// Edit Idea Form
router.get('/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {

      res.render('index', {
        idea:idea
      });
    
  });
});

// Process Form
router.post('/', (req, res) => {

    const newUser = {
      title: req.body.title,
      details: req.body.details,
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        res.redirect('/');
      })
  
});

// Edit Form process
router.put('/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {

    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
      .then(idea => {
        res.redirect('/');
      })
  });
});

// Delete Idea
router.delete('/:id', (req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      res.redirect('/');
    });
});

module.exports = router;
