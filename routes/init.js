
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const staticRoot = path.resolve(__dirname, '../public');
const cors = require('cors');
const whiteList = ['null', 'http://127.0.0.1:5500', 'http://localhost:3000'];
// const session = require('express-session');

// // session中间件
// app.use(session({
//   secret: 'zh',
//   name: 'sessionid',
// }));

// 静态资源服务器
app.use(express.static(staticRoot));
// 允许跨域
app.use(cors({
  origin(origin, callback) {
    if (whiteList.includes(origin) || !origin) {
      callback(null, origin);
    } else {
      callback(new Error('Not Allowed'));
    }
  },
  credentials: true, 
  optionsSuccessStatus: 200,
}));

// 加入cookie-parser 中间件
// 加入之后会在req对象中注入cookie属性，用于获取所有请求传递过来的cookie
// 加入之后会在res对象中注入cookie方法，用于设置cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(require('./tokenMiddleware'));

// 解析application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({extended: true}));

// 解析application/json 格式的请求体
app.use(express.json());

// 处理api请求
app.use('/api/student', require('./api/student'));
app.use('/api/admin', require('./api/admin'));
app.use('/api/stripe', require('./api/stripe'));

// 处理错误的中间件
app.use(require('./errorMiddleware'));

app.listen(port, () => {
  console.log(`listen ${port}`);
});
