var express = require('express');
var router = express.Router();
var mongoose = require('../lib/mongo')
var checklogin = require('../middlewares/checklogin').checklogin;
/* GET home page. */

router.get('/', checklogin, function (req, res, next) {
  res.redirect('/all');
})

router.get('/all', function (req, res, next) {
  function compare(according) {
    return function (a, b) {
      var value1 = a[according];
      var value2 = b[according];
      if (value1 < value2) return -1
      else if (value1 > value2) return 1
      else return 0
    }
  }

  mongoose.PostModel.find() //取出所有post
    .exec(function (err, posts) {
      res.render('index', { user: req.session.name, posts: posts.sort(compare('updatetime')), title: "博客首页" });
    })
})

module.exports = router;
