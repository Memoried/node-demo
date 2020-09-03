const Mock = require('mockjs');
const Student = require('../model/Student');
const result = Mock.mock({
    "datas|1000":[
        {
            name:"@cname",
            birthday:"@date",
            "sex|0-1":0,
            mobile: /^1[3456789]\d{9}$/,
            "ClassId|1-16":1
        }
    ]
}).datas;

Student.bulkCreate(result);
