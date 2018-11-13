const express = require('express');
const router = express.Router();
const mongoose = require('../../lib/mongo')

router.get('/:PostId', function (req, res, next) {
    if (req.session.name) {
    const PostId = req.params.PostId;

    mongoose.PostModel.update({ id: PostId }, { nup: nup+1 }, { multi: true }, function (err, data) {
        if (err) return err;
    });
    }
    res.redirect('/');
})
  
module.exports = router;