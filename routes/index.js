var express = require('express');
var router = express.Router();
var mongoose = require('../lib/mongo')
/* GET home page. */

router.get('/', function (req, res, next) {
      if (!req.session.name) {
        req.flash('error', '请先登录');
      }
      res.redirect('/all');
})

router.get('/all', function (req, res, next) {
  function compare(according) {
    return function (a, b) {
      var value1 = a[according];
      var value2 = b[according];
      return value1 - value2;
    }
  }

  mongoose.PostModel.find() //取出所有post
    .exec(function (err, posts) {
        res.render('index', { user: req.session.name, posts: posts.sort(compare('updatetime')), title: "博客首页" });
    })
})

module.exports = router;
