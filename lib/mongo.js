const mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017/blog';
const moment = require('moment');

mongoose.connect(dburl);

const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open', () => {
console.log('连接数据库成功');
});

exports.mongoose = mongoose;