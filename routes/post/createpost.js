var express = require('express');
var router = express.Router();
var mongopost = require('../../models/posts');

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
    mongopost.create(title, content, author, req.session.showname, function (err, post) {
        if (post) {
            req.flash('success', '创建成功')
            res.redirect('/');
        }
        else {
            req.flash('error', '创建失败')
            res.redirect('/createpost');
        }

    });
});

module.exports = router;