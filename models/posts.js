var mongoose = require('../lib/mongo');
var mongouser = require('../models/users');
var Schema = mongoose.mongoose.Schema;
var moment = require('moment');

function timenow() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

let PostSchema = new Schema({
  id: String,
  title: String,
  content: String,
  author: String,
  showname: String,
  createtime: String,
  updatetime: String,
  nme: Number,
  nup: Number,
});

let Model = mongoose.mongoose.model("Posts", PostSchema);

exports.create = function (title, content, author, showname, nme, nup, callback) {
  let nowtime = timenow();

  let newpost = new Model({
    id: author + nowtime,
    title: title,
    content: content,
    author: author,
    showname: showname,
    createtime: nowtime,
    updatetime: nowtime,
    nme: nme,
    nup: nup,
  });

  newpost.save((err, newpost) => {
    if (err) {
      return console.log(err);
    }
    return callback(null, newpost); //创建成功 返回1
  });
}

exports.getposts = function (name, callback) {
  Model.find({ "author": name }, function (error, data) {
    if (data) {                     //数据存在，返回未排序的数据
      return callback(null, data)
    }
    else {
      return callback(null, 0);    //用户不存在，返回0
    }
  });
}