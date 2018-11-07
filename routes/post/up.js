const express = require('express')
const router = express.Router()
var mongopost = require('../../models/posts');
var mongouser = require('../../models/users');


router.get('/', function (req, res, next) {
    res.redirect('/');
})

module.exports = router;