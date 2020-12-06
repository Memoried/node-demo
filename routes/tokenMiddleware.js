const Result = require('../utils/result');
const { pathToRegexp } = require('path-to-regexp');
const crypt = require('../utils/crypt');
const jwt = require('./jwt');
const needTokenApi = [
    // { method: 'POST', path: '/api/student'},
    { method: 'GET', path: '/api/student' },
    { method: 'PUT', path: '/api/student/:id'},
    { method: 'GET', path: '/api/admin/selfInfo' },
];

module.exports = (req, res, next) => {
    const apis = needTokenApi.filter(api => {
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
    });
    if (apis.length === 0) {
        next();
        return;
    }

    let token = req.cookies.token;
    if (!token) {
        token = req.headers.authorization;
    }
    // console.log(req.session.loginUser);
    // if (req.session.loginUser) {
    //     req.userId = req.session.loginUser.id;
    //     next();
    //     return;
    // }
    const result = jwt.verify(req);
    if (result) {
        req.userId = result.id;
        next();
        return;
    }
    if (!token && !req.session.loginUser && !result) {
        handleNonToken(req, res, next);
        console.log('认证未通过');
        return false;
    }
    const userId = crypt.decrypt(token);
    req.userId = userId;
    next();
};

function handleNonToken(req, res) {
    res.send(new Result('请登录后再试').fail(401));
}