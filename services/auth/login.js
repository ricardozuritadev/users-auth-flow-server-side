const { getCorrectUser } = require('../../queries/auth');
const { hash, serialize } = require('../../utils');
const { login } = require('../../errors/auth');
const errors = require('../../errors/commons');

module.exports = db => async (req, res, next) => {
  // Read data from body
  const { email, username, password } = req.body;

  // Check if email or username is not empty
  if (!email) {
    if (!username) {
      return next(login['emptyUser']);
    }
  }

  // If everithing is ok, ask DB for user
  const compareFn = hash.compare(password); // Execute first currified function
  const queryResult = await getCorrectUser(db)(email, username, compareFn);

  // If "ok" property is false, return error
  if (!queryResult.ok) return next(login[queryResult.code] || errors[500]);

  // If everything's ok, call serialize fn and create JWT and cookie
  serialize(res, { email: queryResult.data.email });

  // Send success true to client
  res.status(200).json({
    success: true,
  });
};
