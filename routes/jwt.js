
//密钥
const secrent = 'jldtnieyqnh5ugh7';
const jwt = require('jsonwebtoken');
const cookieKey = 'token';

// 颁发jwt
exports.publish = function(res, maxAge = 3600 * 24, info={}) {
    const token = jwt.sign(info, secrent, {
        expiresIn: maxAge,
    });
    res.cookie(cookieKey, token, {
        maxAge: maxAge * 1000,
        path: '/',
    });
    res.header('authorization', token);
};

// 认证jwt
exports.verify = function(req) {
    let token;
    // 从cookie中取
    token = req.cookies[cookieKey];
    // 从header中取
    if (!token) {
        token = req.header.authorization;
    }
    // 没有token
    if (!token) {
        return null;
    }
    token = token.split(' ');
    token = token.length === 1 ? token[0] : token[1];
    try {
        const result = jwt.verify(token, secrent);
        return result;
    } catch (err) {
        return null;
    }
};