var express = require('express');
var router = express.Router();
var mongouser = require('../../models/users');


router.get('/', function (req, res, next) {
    res.render('signin', { title: '登录' });
});

router.post('/', function (req, res, next) {
    const name = req.body.username;
    const password = req.body.password;
    mongouser.login(name, password, req, function (err, user) {
        switch (user) {
            case 0:     //用户不存在
                req.flash('error', '用户不存在')
                res.redirect('signin');
                break;
            case 1:     //用户存在，密码正确
                req.flash('success', '登录成功')
                res.redirect('/all');
                break;
            case 2:     //用户存在，密码错误
                req.flash('error', '密码错误')
                res.redirect('signin');
                break;
            default:
        }
    });
});

module.exports = router;