const validate = require('validate.js');
const moment = require('moment');

validate.extend(validate.validators.datetime, {

    /**
     * 该函数会自动用于日期格式转换
     * 它会在验证时自动触发，它需要将任何数据转换为时间戳返回
     * 如果无法转换，返回NaN
     * @param {*} value 传入要转换的值
     * @param {*} options 针对某个属性的验证配置
     */
    parse: function (value, options) {
        let formats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'x'];

        if (options.dateOnly) {
            formats = ['YYYY-MM-DD', 'YYYY-M-D', 'x'];
        }
        return Number(moment.utc(value, formats, true));
    },
    
    /**
     * 用于显示错误显示时，使用的显示字符串
     * @param {*} value 
     * @param {*} options 
     */
    format: function (value, options) {
        const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';

        return moment.utc(value).format(format);
    },
});
const rules = {
  name: {
    presence: {
      allowEmpty: false,
    },
    type: 'string',
    length: {
      minimum: 1,
      maximum: 10,
    },
  },
  sex: {
    presence: {
      allowEmpty: false,
    },
  },
  mobile: {
    presence: {
      allowEmpty: false,
    },
    format: {
      pattern: '1[0-9]{10}',
    },
  },
  birthday: {
    presence: {
      allowEmpty: false,
    },
    datetime: {
      dateOnly: true,
      earliest: moment.utc().subtract(100, 'y'),
      latest: moment.utc().subtract(5, 'y'),
    },
  },
  classId: {
    presence: {
      allowEmpty: false,
    },
  },
  filters(arr) {
    let newObj = {};
    const ruleArr = Object.keys(this);

    arr.forEach((item) => {
      const key = item;

      if (item === 'filters') {
        throw '不能使用filters当做规则属性';
      }
      if (ruleArr.includes(key)) {
        newObj[item] = this[item];
      }
    });

    return newObj;
  },
};

validate.$rules = rules;
exports.validate = validate;
