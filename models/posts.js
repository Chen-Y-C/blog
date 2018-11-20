var mongoose = require('../lib/mongo');
var moment = require('moment');

function timenow() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

exports.create = function (title, content, author, showname, callback) {
  let nowtime = timenow();

  let newpost = new mongoose.PostModel({
    id: author + nowtime,
    title: title,
    content: content,
    author: author,
    showname: showname,
    createtime: nowtime,
    updatetime: nowtime,
  });

  newpost.save((err, newpost) => {
    if (err) {
      return console.log(err);
    }
    return callback(null, newpost); //创建成功 返回1
  });
}

exports.getposts = function (name, callback) {

  function compare(according) {
    return function (a, b) {
      var value1 = a[according];
      var value2 = b[according];
      if (value1 < value2) return -1
      else if (value1 > value2) return 1
      else return 0
    }
  }

  mongoose.PostModel.find({ "author": name }, function (error, data) {
    if (data) {                     //数据存在，返回未排序的数据
      return callback(null, data.sort(compare('updatetime')))
    }
    else {
      return callback(null, 0);    //用户不存在，返回0
    }
  });
}

exports.editpost = function (id, title, content, callback) {
  let nowtime = timenow();
  mongoose.PostModel.update({ id: id }, { title: title, content: content, updatetime: nowtime }, { multi: false })
    .exec(function (err, data) {
      if (err) return (err)
      else return callback(null, 1);
    })
}