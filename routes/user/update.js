var express = require('express');
var router = express.Router();
var mongouser = require('../../models/users');
var mongoose = require('../../lib/mongo');

router.get('/', function (req, res, next) {
    if (!req.session.name) {
        res.redirect('/all');
    }
    res.render('update', { user: req.session.name, showname: req.session.showname, title: '修改用户信息' });
});

router.post('/', function (req, res, next) {
    let name = req.session.name;
    if (!name) {
        res.redirect('/all');
    }
    let oldpassword = req.body.oldpassword;
    let newpassword = req.body.newpassword;
    let showname = req.body.showname;

    mongouser.update(name, showname, oldpassword, newpassword, function (err, user) {
        if (user) {
            req.session.showname = showname;
            mongoose.PostModel.update({ author: name }, { showname: showname }, { multi: true }, function (err, data) {
                if (err) return err;
            });
            mongoose.PostModel.update({ "upid.name": name }, { $set: { "upid.$.showname": showname, } }, { multi: true }, function (err, data) {
                if (err) return err;
            })
            mongoose.CommentModel.update({ "name": name }, { showname: showname, }, { multi: true }, function (err, data) {
                if (err) return err;
            })

            req.flash('success', '修改完成')
            res.redirect('/all');      //返回1，修改成功
        }
        else {                      //返回0，密码错误
            req.flash('error', '密码错误')
            res.redirect('back')
        }
    });
});

module.exports = router;
