const Admin = require('../model/Admin');
exports.addAdmin = async (adminObj) => {
    const ins = await Admin.create(adminObj);
    return ins.toJSON();
};

exports.deleteAdmin = async (id) => {
    // 方式一
    // const ins = await Admin.findByPk(adminId);
    // if (ins) await ins.destroy();
    // 方式二
    await Admin.destroy({ where:{ id }});
};

exports.updateAdmin = async (id , adminObj) => {
    // 方式一
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId;
    // await ins.save();
    // 方式二
    await Admin.update( adminObj,{ where:{ id } });
};