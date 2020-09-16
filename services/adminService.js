const md5 = require('md5');
const Admin = require('../model/Admin');

exports.addAdmin = async (adminObj) => {
    adminObj.loginPwd = md5(adminObj.loginPwd);
    const ins = await Admin.create(adminObj);

    return ins.toJSON();
};

exports.deleteAdmin = async (id) => {
    await Admin.destroy({
        where: { id },
    });
};

exports.updateAdmin = async (id, adminObj) => {
    adminObj.loginPwd = md5(adminObj.loginPwd);
    await Admin.update(adminObj, { where: { id } });
};

exports.login = async (loginId, loginPwd) => {
    loginPwd = md5(loginPwd);
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd,
        },
    });

    if (result && result.loginId === loginId && result.loginPwd === loginPwd) {
        return result.toJSON();
    }
    return result;
};

exports.getAdminById = async (id) => {
    const result = await Admin.findByPk(id);

    return result ? result.toJSON() : result;
};