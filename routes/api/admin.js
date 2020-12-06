const express = require('express');
const router = express.Router();
const adminService = require('../../services/adminService');
const Result = require('../../utils/result');
// const crypto = require('../../utils/crypt');
const jwt = require('../jwt');

// 登录
router.post('/login', async (req, res) => {
    const result = await adminService.login(req.body.loginId, req.body.loginPwd);
    // console.log(result);
    if (result) {
        let value = result.id;
        // value = crypto.encrypt(value.toString());
        // 登录成功 cookie
        // res.cookie('token', value, {
        //     path: '/',
        //     domain: 'localhost',
        //     maxAge: 7 * 24 * 3600 * 1000,
        // });
        // 登录成功 session
        // req.session.loginUser = result;
        // res.header('authorization', value);
        // 登录成功 jwt
        jwt.publish(res, undefined, {id: value});
        res.send(new Result('登录成功').success());
    } else {
        res.send(new Result('账号或密码输入有误').fail());
    }
});

// 添加管理员
router.post('/add', async (req, res) => {
    const result = await adminService.addAdmin({
        loginId: req.body.loginId,
        loginPwd: req.body.loginPwd,
        name: req.body.name || 'zh',
    });

    if (result) {
        res.send(new Result(result).success());
    } else {
        res.send(new Result('该用户已被添加').fail());
    }
});
// 获取自己的信息
router.get('/selfInfo', async (req, res) => {
    const result = await adminService.getAdminById(req.userId);
    res.send(new Result(result).success());
});

module.exports = router;