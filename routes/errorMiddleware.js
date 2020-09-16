const Result = require('../utils/result');

module.exports = (err, req, res, next) => {
  if (err) {
    res.send(new Result(err).fail());
  } else {
    next();
  }
};
