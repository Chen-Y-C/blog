var express = require('express');
var router = express.Router();
var mongouser = require('../../models/users');
var mongoose = require('../../lib/mongo');

router.get('/', function (req, res, next) {
    if (!req.session.name) {
        res.redirect('/');
    }
    res.render('update', { tishi: '', showname: req.session.showname });
});

router.post('/', function (req, res, next) {
    let name = req.session.name;
    if (!name) {
        res.redirect('/');
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
            res.redirect('/');      //返回1，修改成功
        }
        else {                      //返回0，密码错误
            res.render('update', { tishi: '密码错误！', showname: req.session.showname });
        }
    });
});

module.exports = router;