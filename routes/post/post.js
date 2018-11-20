var express = require('express');
var router = express.Router();
var mongoose = require('../../lib/mongo')
var mongopost = require('../../models/posts')
var checklogin = require('../../middlewares/checklogin').checklogin;

//点击昵称取出用户全部post
router.get('/:name', checklogin, function (req, res, next) {

    const name = req.params.name;
    function compare(according) {   //排序函数
        return function (a, b) {
            var value1 = a[according];
            var value2 = b[according];
            if (value1 < value2) return -1
            else if (value1 > value2) return 1
            else return 0
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
router.get('/id/:id', checklogin, function (req, res, next) {
    const id = req.params.id;

    mongoose.PostModel.find({ 'id': id }) //取出此id对应的post
        .exec(function (err, posts) {
            if (posts == null)
                req.flash('error', '无文章');
            mongoose.CommentModel.find({ postid: id })
                .exec(function (err, comment) {
                    res.render('post', { user: req.session.name, posts: posts, comment: comment, title: '查看文章' })
                })
        })
})

router.get('/edit/:id', checklogin, function (req, res, next) {
    const id = req.params.id;

    mongoose.PostModel.findOne({ 'id': id }) //取出此id对应的post
        .exec(function (err, post) {
            if (post == null)
                req.flash('error', '无文章');
            res.render('editpost', { user: req.session.name, post: post, title: '编辑文章' });
        })
})

router.post('/edit/:id', checklogin, function (req, res, next) {

    let id = req.params.id;
    let title = req.body.title;
    let content = req.body.content;

    mongopost.editpost(id, title, content, function (err, data) {
        if (data == null)
            req.flash('error', '操作失败');
        req.flash('success', '修改完成');
        res.redirect('/post/id/' + id);
    })
})

router.get('/remove/:id', checklogin, function (req, res, next) {
    const id = req.params.id;

    mongoose.PostModel.remove({ 'id': id }) //取出此id对应的post
        .exec(function (err) {
            if (err)
                req.flash('error', '操作失败');
            mongoose.CommentModel.remove({ postid: id })
                .exec(function (err) {
                    req.flash('error', '删除成功，返回首页');
                    res.redirect('/all');
                })
        })
})

module.exports = router;