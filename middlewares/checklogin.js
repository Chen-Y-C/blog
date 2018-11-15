module.exports = {
    checkLogin: function checkLogin (req, res, next) {
      if (!req.session.name) {
        req.flash('error', '未登录')
      }
      next()
    },
  
    checkNotLogin: function checkNotLogin (req, res, next) {
      if (req.session.name) {
        req.flash('error', '已登录')
        return res.redirect('back')// 返回之前的页面
      }
      next()
    }
  }