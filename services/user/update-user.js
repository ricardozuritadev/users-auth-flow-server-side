const { updateUserInfo } = require('../../queries/auth');
const { getUserInfo } = require('../../errors/user');
const { cookie } = require('../../utils');
const errors = require('../../errors/commons');

module.exports = db => async (req, res, next) => {
  // Get email from res.locals
  const { email } = res.locals;

  // Get new data from body
  const { newEmail, newUsername } = req.body;

  // Ask user to DB
  const queryResult = await updateUserInfo(db)(email, newEmail, newUsername);

  // If queryResult.ok is false, return "something went wrogn" error
  if (!queryResult.ok)
    return next(getUserInfo[queryResult.code] || errors[400]);

  // Remove cookie with clear() fn
  cookie.clear(res);

  res.status(200).json({
    success: true,
  });
};
