const router = require('express').Router();
const { authorizer, checker } = require('../../middlewares');

const forms = {
  register: ['email', 'password', 'username'],
  login: ['password'],
};

module.exports = db => {
  router.post(
    '/register',
    checker(...forms.register),
    require('./register')(db)
  );
  router.post('/login', checker(...forms.login), require('./login')(db));
  router.post('/logout', authorizer, require('./logout'));

  return router;
};
