const router = require('express').Router();
const { authorizer } = require('../../middlewares');

module.exports = db => {
  router.get('/test', (req, res, next) => {
    res.status(200).json({
      success: true,
      message: 'ok',
    });
  });
  router.get('/', authorizer, require('./get-user')(db));
  router.patch('/', authorizer, require('./update-user')(db));

  return router;
};
