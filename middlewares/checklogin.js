exports.checklogin = function (req, res, next) {
    if (!req.session.name) {
        req.flash('error', '请先登录')
        res.redirect('/all');
    }
    next();
}