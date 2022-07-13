const { getFullUser } = require('../../queries/auth');
const errors = require('../../errors/commons');

module.exports = db => async (req, res, next) => {
  // Get email from res.locals
  const { email } = res.locals;

  // Ask user to DB
  const queryResult = await getFullUser(db)(email);

  // If queryResult.ok is false, return "something went wrogn" error
  if (!queryResult.ok) return next(errors[400]);

  const { username } = queryResult.data;

  // If queryResult.ok is true, return logged user data to client
  res.status(200).json({
    success: true,
    data: {
      email,
      username,
    },
  });
};
