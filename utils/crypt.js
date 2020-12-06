// 使用对称加算法：aes 128
// 128位的密钥
const secret = Buffer.from('gddu38b9v5a93p5k');
const crypto = require('crypto');
// 准备一个iv,随机向量
const iv = Buffer.from('cq4gic38j5ognues');

exports.encrypt = function (str) {
    const cry = crypto.createCipheriv('aes-128-cbc', secret, iv);
    let result = cry.update(str, 'utf8', 'hex');

    result += cry.final('hex');
    return result;
};

exports.decrypt = function (str) {
    const decry = crypto.createDecipheriv('aes-128-cbc', secret, iv);
    let result = decry.update(str, 'hex', 'utf8');
    result += decry.final('utf8');
    return result;
};
