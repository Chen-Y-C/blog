const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {

  req.session.name = null;
  req.session.showname = null;
  req.flash('error','登出成功')
  res.redirect('/all');
})

module.exports = router;