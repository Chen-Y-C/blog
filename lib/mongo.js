const mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017/blog';

mongoose.connect(dburl);

const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open', () => {
    console.log('连接数据库成功');
});

let PostSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    author: String,
    showname: String,
    createtime: String,
    updatetime: String,
    nme: { type: Number, default: 0 },
    nup: { type: Number, default: 0 },
    upid: [{
        name: String,
        showname: String,
    }],
});

let CommentSchema = new mongoose.Schema({
    postid: String,
    name: String,
    showname: String,
    content: String,
    time: String,
})

let UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    showname: String,
});

exports.UserModel = mongoose.model("Users", UserSchema);
exports.PostModel = mongoose.model("Posts", PostSchema);
exports.CommentModel = mongoose.model("Comments", CommentSchema);

exports.mongoose = mongoose;