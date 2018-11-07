var express = require('express');
var router = express.Router();
var mongopost = require('../../models/posts');

/* GET users listing. */
router.get('/', function (req, res, next) {

  function compare(according) {
    return function (a, b) {
      var value1 = a[according];
      var value2 = b[according];
      return value1 - value2;
    }
  }

  if (req.session.name) {
    mongopost.getposts(req.session.name, function (err, posts) {
      res.render('users', { posts: posts.sort(compare('updatetime')) }); //依据更新时间倒叙输出post
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;