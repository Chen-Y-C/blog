var express = require('express');
var router = express.Router();
var mongopost = require('../models/posts');
var mongouser = require('../models/users');
var mongoose = require('../lib/mongo')

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = false;
  if (req.session.name) {
    user = true;
  }
  
  mongoose.PostModel.find(function (err, posts) {
    res.render('index', { user: user, posts: posts });
  })

});

module.exports = router;