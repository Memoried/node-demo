const Result = require('../utils/result');

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err) {
    res.send(new Result(err.message).fail(500));
  } else {
    next();
  }
};
