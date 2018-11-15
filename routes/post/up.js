const express = require('express');
const router = express.Router();
const up = require('../../models/ups').up;

router.get('/:PostId', function (req, res, next) {

    if (req.session.name) {
        const PostId = req.params.PostId;
        up(req, PostId, function (err, data) {
            if (data) {
                req.flash('success', '点赞成功');
            } else {
                req.flash('error', '取消点赞');
            }
            res.redirect('back');
        })
    }
    else {
        req.flash('error', '请先登录');
        res.redirect('/');
    }
})

module.exports = router;