const { generic } = require('../errors/auth');

module.exports =
  (...fields) =>
  (req, _, next) => {
    // Check if some field is missing in req.body with for of bucle
    for (const field of fields) {
      if (!req.body[field]) return next(generic['empty']);
    }

    // Go to next middleware if everything is ok
    next();
  };
