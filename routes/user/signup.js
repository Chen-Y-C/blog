var express = require('express');
var router = express.Router();
var mongouser = require('../../models/users');

router.get('/', function (req, res, next) {
    res.render('signup', { tishi: '' });
});

router.post('/', function (req, res, next) {
    const name = req.body.username;
    const showname = req.body.showname;
    const password = req.body.password;
    req.session.name = name;
    req.session.showname = showname;
    mongouser.create(name,showname, password, function(err, user){
        if (user) {
            req.flash('success','注册成功')
            res.redirect('/');
        }
        else {
            req.session.name = null;
            res.render('signup',{ tishi: '用户名已被注册' });
        }
    });

});

module.exports = router;