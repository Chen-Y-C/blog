var express = require('express');
var router = express.Router();
var mongopost = require('../models/posts');
var mongouser = require('../models/users');

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = false;
  if (req.session.name) {
    user = true;
  }


  mongopost.getposts(req.session.name, function (err, posts) {
    for (i = posts.length - 1; i >= 0; i--) {
      mongouser.getshowname(posts[i].author, function (err, showname) {
      });
    }
    res.render('index', { user: user, posts: posts });
  });
});

module.exports = router;