const { createUser } = require('../../queries/auth');
const { encrypt } = require('../../utils/hash');
const { generic, register } = require('../../errors/auth');
const errors = require('../../errors/commons');

module.exports = db => async (req, res, next) => {
  // Read data from body
  const { email, username, password } = req.body;

  // Hash password using encrypt() fn
  const hashedPassword = await encrypt(password);

  // Try to save new user on DB with createUSer() fn
  const queryResult = await createUser(db)(email, username, hashedPassword);

  // If user already existsm return "duplication" error, or 500 error
  if (!queryResult.ok) return next(register[queryResult.code] || errors[500]);

  // Send success true to client
  res.status(200).json({
    success: true,
  });
};
