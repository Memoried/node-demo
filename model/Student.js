const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
}, {
    updatedAt: false,
    createdAt: false,
    paranoid: true,
});

module.exports = Student;