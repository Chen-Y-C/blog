var mongoose = require('../lib/mongo');
var mongopost = require('../models/posts');
var Schema = mongoose.mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  password: String,
  showname: String,
});

let Model = mongoose.mongoose.model("UserNamePassword", UserSchema);

exports.create = function (name, password, callback) {
  Model.find({ "name": name }, function (error, data) {
    if (data.length) {
      return callback(null, 0);
    }
    else {
      let newuser = new Model({
        name: name,
        password: password,
        showname: name,
      });
      newuser.save((err, newuser) => {
        if (err) {
          return console.log(err);
        }
        return callback(null, 1);
      });
    }
  });
}

exports.login = function (name, password, req, callback) {
  Model.findOne({ "name": name }, function (error, data) {
    if (data) {                    //用户存在
      if (data.password === password) {
        req.session.showname = data.showname;
        req.session.name = data.name;
        return callback(null, 1);  //用户存在，且密码正确 返回1
      }
      else
        return callback(null, 2);  //用户存在，但密码错误 返回2
    }
    else {
      return callback(null, 0);  //用户不存在，返回0
    }
  });
}

exports.update = function (name, showname, oldpassword, newpassword, callback) {
  Model.findOne({ "name": name }, function (error, data) {
    if (data.password === oldpassword) {
      data.showname = showname;
      data.password = newpassword;
      data.save((err, data) => {
        if (err) {
          return console.log(err);
        }
      });

      mongopost.getposts(name, function (err, posts) {
        let postModel = mongoose.mongoose.model("Posts", PostSchema);
        postModel.find({ "author": name }, function (error, data) {
          if (data) {                     //数据存在，返回未排序的数据
            return callback(null, data)
          }
          else {
            return callback(null, 0);    //用户不存在，返回0
          }
        });
      });

      return callback(null, 1);  //原密码输入正确 信息更新完成 返回1
    } else
      return callback(null, 0);  //原密码输入错误 返回0
  });
}

exports.getshowname = function (name, callback) {
  Model.findOne({ "name": name }, function (error, data) {
    if (data)
      return callback(null, data.showname);  //找到用户   返回1
    else
      return callback(null, 0);  //未找到用户 返回0
  });
}