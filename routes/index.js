var express = require('express');
var router = express.Router();
var mongoose = require('../lib/mongo')

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = false;
  if (req.session.name) {
    user = true;
  }

  function compare(according) {
    return function (a, b) {
      var value1 = a[according];
      var value2 = b[according];
      return value1 - value2;
    }
  }

  mongoose.PostModel.find()
    .exec(function (err, posts) {
      res.render('index', { user: user, posts: posts.sort(compare('updatetime')) })
    })
})

module.exports = router;
