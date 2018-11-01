var express = require('express');
var router = express.Router();
var mongopost = require('../models/posts');

router.get('/', function (req, res, next) {
    if (req.session.name) {
        res.render('createpost');
    } else {
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    let author = req.session.name;
    mongopost.create(title, content, author, req.session.showname, 0, 0, function (err, post) {
        if (post)
            res.redirect('/users');
        else
            res.redirect('/createpost');
    });
});

module.exports = router;