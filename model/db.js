const {Sequelize} = require('sequelize');
const {sqlLogger} = require('../logger');
const sequelize = new Sequelize('myschooldb', 'root', 'zhanghao123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: (msg) => {
        sqlLogger.debug(msg);
    },
});

module.exports = sequelize;