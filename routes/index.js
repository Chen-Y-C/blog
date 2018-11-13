var express = require('express');
var router = express.Router();
var mongoose = require('../lib/mongo')

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = false;
  if (req.session.name) {
    user = true;
  }

  let names = new Array;
  let shownames = new Array;

  mongoose.PostModel.find()
    .exec(function (err, posts) {
      res.render('index', { user: user, posts: posts })
    })
})

module.exports = router;
