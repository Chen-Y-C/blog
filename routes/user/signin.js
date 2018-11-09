var express = require('express');
var router = express.Router();
var mongouser = require('../../models/users');

router.get('/', function (req, res, next) {
    res.render('signin', { message: '' });
});

router.post('/', function (req, res, next) {
    const name = req.body.username;
    const password = req.body.password;
    mongouser.login(name, password, req, function (err, user) {
        switch (user) {
            case 0:     //用户不存在
                res.render('signin', { message: "用户不存在！" });
                break;
            case 1:     //用户存在，密码正确
                res.redirect('/');
                break;
            case 2:     //用户存在，密码错误
                res.render('signin', { message: "密码错误！" });
                break;
            default:
        }
    });
});

module.exports = router;