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
    nme: Number,
    nup: Number,
});

let UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    showname: String,
});

let CommentSchema = new mongoose.Schema({
    postid:String,
    comments:[{
        name:String,
        content:String,
        time:String,
    }],
})

exports.UserModel = mongoose.model("Users", UserSchema);
exports.PostModel = mongoose.model("Posts", PostSchema);
exports.CommentSchema = mongoose.model("Comments", CommentSchema);

exports.mongoose = mongoose;