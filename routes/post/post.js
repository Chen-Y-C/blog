var express = require('express');
var router = express.Router();
var mongoose = require('../../lib/mongo')

//点击创建着昵称取出用户全部post
router.get('/:name', function (req, res, next) {
    if (!req.session.name) {
        req.flash('error', '请先登录')
        res.redirect('/all');
    }

    const name = req.params.name;
    function compare(according) {
        return function (a, b) {
            var value1 = a[according];
            var value2 = b[according];
            return value1 - value2;
        }
    }

    mongoose.PostModel.find({ 'author': name }) //取出name下的所有post
        .exec(function (err, posts) {
            if (posts.length === 0) {
                req.flash('error', '无文章，已返回首页');
                res.redirect('/all')
            }
            else
                res.render('index', { user: req.session.name, posts: posts.sort(compare('updatetime')), title: posts[0].showname + '的文章' })
        })
})

//点击文章标题按id取出post
router.get('/id/:id', function (req, res, next) {
    if (!req.session.name) {
        req.flash('error', '请先登录')
        res.redirect('/all');
    }
    const id = req.params.id;

    mongoose.PostModel.find({ 'id': id }) //取出此id对应的post
        .exec(function (err, posts) {
            if (!req.session.name)
                req.flash('error', '请先登录');
            if (posts == null)
                req.flash('error', '无文章');
            mongoose.CommentModel.find({ postid: id })
                .exec(function(err,comment) {
                    res.render('post', { user: req.session.name, posts: posts, comment: comment, title: '查看文章' })
                })
        })
})

router.get('/edit/:id', function (req, res, next) {
    if (!req.session.name) {
        req.flash('error', '请先登录')
        res.redirect('/all');
    }
    const id = req.params.id;

    mongoose.PostModel.find({ 'id': id }) //取出此id对应的post
        .exec(function (err, posts) {
            if (!req.session.name)
                req.flash('error', '请先登录');
            if (posts == null)
                req.flash('error', '无文章');
            mongoose.CommentModel.find({ postid: id })
                .exec(function(err,comment) {
                    res.render('post', { user: req.session.name, posts: posts, comment: comment, title: '查看文章' })
                })
        })
})

router.get('/remove/:id', function (req, res, next) {
    if (!req.session.name) {
        req.flash('error', '请先登录')
        res.redirect('/all');
    }
    const id = req.params.id;

    mongoose.PostModel.find({ 'id': id }) //取出此id对应的post
        .exec(function (err, posts) {
            if (!req.session.name)
                req.flash('error', '请先登录');
            if (posts == null)
                req.flash('error', '无文章');
            mongoose.CommentModel.find({ postid: id })
                .exec(function(err,comment) {
                    res.render('post', { user: req.session.name, posts: posts, comment: comment, title: '查看文章' })
                })
        })
})
module.exports = router;