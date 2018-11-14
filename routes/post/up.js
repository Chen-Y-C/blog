const express = require('express');
const router = express.Router();
const mongoose = require('../../lib/mongo')

router.get('/:PostId', function (req, res, next) {
    if (req.session.name) {
        const PostId = req.params.PostId;
        mongoose.PostModel.update({ id: PostId }, { $inc: { "nup": 1 } }, { multi: false }, function (err, data) {
            if (err) return err;
        });
    }
    res.redirect('/');
})

module.exports = router;