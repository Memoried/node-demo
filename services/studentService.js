const Student = require('../model/Student');
const { Op } = require('sequelize');
const Class = require('../model/Class');
const { validate } = require('../utils/validate');

Student.belongsTo(Class);

exports.addStudent = async (studentObj) => {
    const rule = validate.$rules.filters(['name', 'birthday', 'sex', 'mobile', 'classId']);
    const result = validate.validate(studentObj, rule);

    return result || (await Student.create(studentObj)).toJSON();
};

exports.deleteStudent = async (id) => {
    await Student.destroy({
        where: { id },
    });
};
exports.updateStudent = async (id, studentObj) => {
    await Student.update(studentObj, {
        where: { id },
    });
};

exports.getStudent = async (id) => {
    const ins = await Student.findOne({
        where: {id},
    });

    if (ins) {
        return ins.toJSON();
    }
        return false;
    
};

exports.getStudents = async (page = 1, limit = 10, sex = -1, name = '') => {
    const condition = {};

    if (sex !== -1) {
        condition.sex = sex ? 1 : 0;
    }

    condition.name = {
        [Op.like]: `%${name}%`,
    };
    const result = await Student.findAndCountAll({
        attributes: ['id', 'name', 'birthday', 'sex'],
        offset: (page - 1) * limit,
        limit: Number(limit),
        where: condition,
        include: {
            model: Class,
            attributes: ['name'],
            completed: true,
        },
    });

    console.log(JSON.stringify(result.rows));
    
return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows)),
    };
};