const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {

  req.session.name = null;
  req.session.showname = null;
  res.redirect('/');
})

module.exports = router;