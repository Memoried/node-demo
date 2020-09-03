const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('myschooldb', 'root', 'zhanghao123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: null
});

module.exports = sequelize;