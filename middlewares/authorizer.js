const { deserialize } = require('../utils');
const errors = require('../errors/commons');

module.exports = (req, res, next) => {
  // Deserialize cookie with deserialize() fn
  const payload = deserialize(req);

  // If payload is false, return "unauthorized" error
  if (!payload) return next(errors[401]);

  // Save authorized user in res.locals
  res.locals = { ...payload };

  // Go to next middleware if everything is ok
  next();
};
