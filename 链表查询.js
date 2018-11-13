const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dburl = 'mongodb://localhost:27017/blog2';

mongoose.connect(dburl);

const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open', () => {
    console.log('连接数据库成功');
});

var studentSchema = new Schema({
    name: String,
    age: String,
    school: {
        type: Schema.Types.ObjectId,
        ref: 'school'
    }
});
var schoolSchema = new Schema({
    name: String,
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'student'
        }
    ],
    city: {
        type: Schema.Types.ObjectId,
        ref: 'city'
    }
});
var citySchema = new Schema({
    name: String,
    school: [
        {
            type: Schema.Types.ObjectId,
            ref: 'school'
        }
    ]
});
var Student = mongoose.model('student', studentSchema);
var School = mongoose.model("school", schoolSchema);
var City = mongoose.model("city", citySchema);

var city = new City({
    name: '北京',
    school: []
});

city.save(function (err, city) {
    var school = new School({
        name: 'Test',
        students: [],
        city: city._id
    });
    school.save(function (err, school) {
        var student = new Student({
            name: 'Tom',
            age: 20,
            school: school._id
        });
        student.save();
    });
});

 Student.findOne({ name: 'Tom' })
     .populate({ path: 'school', populate: { path: 'city' } })
    .exec(function (err, data) {
        console.log(data.name + ' 所在学校为：' + data.school.name + "，所在城市为：" + data.school.city.name);
    })

