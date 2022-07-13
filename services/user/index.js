const router = require('express').Router();
const { authorizer } = require('../../middlewares');

module.exports = db => {
  router.get('/', authorizer, require('./get-user')(db));
  router.patch('/', authorizer, require('./update-user')(db));

  return router;
};
