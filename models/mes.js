var mongoose = require('../lib/mongo');
var moment = require('moment');

function timenow() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

exports.me = function (req, PostId, content, callback) {
    let nowtime = timenow();

    let newcomment = new mongoose.CommentModel({
        postid: PostId,
        name: req.session.name,
        showname: req.session.showname,
        content: content,
        time: nowtime,
    });

    newcomment.save((err, comment) => {
        if (err) {
            return console.log(err);
        }
        mongoose.PostModel.findOne({ id: PostId })
            .exec(function (err, data) {
                if (data) {
                    mongoose.PostModel.update({ id: PostId }, { $inc: { "nme": 1 } }, { multi: false }, function (err, data) {
                        if (err) return (err)
                    });
                    return callback(null, 1); //返回1，新增回复成功
                }
                else {
                    return callback(null, 0); //返回0，新增回复失败
                }
            })
    });
}

exports.removeme = function (PostId, MeId, callback) {
    mongoose.PostModel.update({ id: PostId }, { $inc: { "nme": -1 } }, { multi: false }, function (err, data) {
        if (data) {

            mongoose.CommentModel.findOneAndRemove({ _id: MeId })
                .exec(function (err, data) {
                    if (err) return (err);
                    return callback(null, 1);
                })
        }
        else
            return callback(null, 0);
    });
}