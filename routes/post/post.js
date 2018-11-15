var express = require('express');
var router = express.Router();
var mongoose = require('../../lib/mongo')

router.get('/:name', function (req, res, next) {
    if (!req.session.name){
        req.flash('error','请先登录')
        res.redirect('/');
    }
        
    const name = req.params.name;
    console.log(req.params.name)
    function compare(according) {
        return function (a, b) {
            var value1 = a[according];
            var value2 = b[according];
            return value1 - value2;
        }
    }

    mongoose.PostModel.find({ 'author': name }) //取出name下的所有post
        .exec(function (err, posts) {
            if (!req.session.name)
                req.flash('error', '请先登录');
            if (posts == null)
                req.flash('error', '无文章');
            res.render('index', { user: req.session.name, posts: posts.sort(compare('updatetime')) })
        })
})

module.exports = router;
