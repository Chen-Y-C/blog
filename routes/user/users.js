var express = require('express');
var router = express.Router();
var mongopost = require('../../models/posts');

/* GET users listing. */
router.get('/', function (req, res, next) {


  if (req.session.name) {
    mongopost.getposts(req.session.name, function (err, posts) {
      res.render('users', { posts: posts }); //依据更新时间倒叙输出post
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;