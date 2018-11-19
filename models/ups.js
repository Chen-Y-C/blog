var mongoose = require('../lib/mongo');

exports.up = function (req, PostId, callback) {
    mongoose.PostModel.findOne({ id: PostId, "upid.name": req.session.name })
        .exec(function (err, data) {
            if (data) {
                mongoose.PostModel.update({ id: PostId }, {
                    $inc: { "nup": -1 },
                    $pull: {
                        upid: {
                            name: req.session.name,
                        }
                    }
                }, { multi: false }, function (err, data) {
                    if (err) return (err)
                });
                return callback(null, 0);
            }
            else {
                mongoose.PostModel.update({ id: PostId }, {
                    $inc: { "nup": 1 },
                    $push: {
                        upid: {
                            name: req.session.name,
                            showname: req.session.showname,
                        }
                    }
                }, { multi: false }, function (err, data) {
                    if (err) return (err)
                });
                return callback(null, 1);
            }
        })
}