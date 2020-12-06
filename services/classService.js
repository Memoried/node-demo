const Class = require('../model/Class');

exports.addClass = async (classObj) => {
    const ins = await Class.create(classObj);

    return ins.toJSON();
};

exports.delete = async (id) => {
    await Class.destroy({
        where: {id},
    });
};

exports.update = async (id, classObj) => {
    await Class.update(classObj, {
        where: {id},
    });
};