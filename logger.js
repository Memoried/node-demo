const log4js = require('log4js');
const path = require('path');

log4js.configure({
    appenders: {
        sql: {
            // 定义一个sql日志出口
            type: 'dateFile',
            filename: path.resolve(__dirname, 'logs', 'sql', 'logging.log'),
            maxLogSize: 1024 * 1024, // 配置文件的最大字节数
            keepFileExt: true,
            layout: {
                type: 'pattern',
                pattern: '%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n',
            },
        },
        default: {
            type: 'stdout',
        },
    },
    categories: {
        sql: { appenders: ['sql'], level: 'all' },
        default: { appenders: ['default'], level: 'debug' },
    },
});

const sqlLogger = log4js.getLogger('sql');
const defaultLogger = log4js.getLogger('default');

exports.sqlLogger = sqlLogger;
exports.logger = defaultLogger;