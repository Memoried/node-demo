const Student = require('../model/Student');

exports.addStudent = async (StudentObj) => {
    const ins = await Student.create(StudentObj);
    return ins.toJSON();
}

exports.deleteStudent = async (id) => {
    await Student.destroy({
        where:{id}
    });
}

exports.updateStudent = async (id,StudentObj) => {
    await Student.update(StudentObj,{
        where:{id}
    });
}