const Mock = require('mockjs');
const Class = require('../model/Class');
const result = Mock.mock({ 
    "datas|16": [
        {
            "id|+1": 1,
            "name": "第 @id 班",
            "openDate": "@datetime"
        }
    ]
}).datas;
console.log(result);
result.forEach(async (item) => {
    await Class.update(item,{
        where:{id:item.id}
    })
});
