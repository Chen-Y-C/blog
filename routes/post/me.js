const express = require('express');
const router = express.Router();
const me = require('../../models/mes');

router.post('/creat/:PostId', function (req, res, next) {
    if (req.session.name) {
        let PostId = req.params.PostId;
        let content = req.body.ctt;
        me.me(req, PostId, content, function (err, data) {
            if (data) {
                req.flash('success', '留言成功');
            } else {
                req.flash('error', '留言失败');
            }
            res.redirect('back');
        })
    }
    else {
        req.flash('error', '请先登录')
        res.redirect('/all');
    }
})

router.get('/remove/:PostId/:MeId', function (req, res, next) {
    if (req.session.name) {
        let PostId = req.params.PostId;
        let MeId = req.params.MeId;
        me.removeme(PostId, MeId, function (err, data) {
            if (data) {
                req.flash('error', '删除成功');
            } else {
                req.flash('error', '删除失败');
            }
            res.redirect('back');
        })
    }
    else {
        req.flash('error', '请先登录')
        res.redirect('back');
    }
})

module.exports = router;