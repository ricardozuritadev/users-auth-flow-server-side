const { queryCatcher } = require('../utils');
const { selectUser, insertUser, updateUser } = require('./db-queries');

// Function to get user from DB
const getFullUser =
  db =>
  async (email, username = null) => {
    return await queryCatcher(
      db.maybeOne,
      'getFullUser'
    )(selectUser(email, username));
  };

// Function to insert user into DB
const createUser = db => async (email, username, hashedPassword) => {
  const user = await getFullUser(db)(email, username);

  if (user.data) {
    return {
      ok: false,
      code: 'duplication',
    };
  }

  return await queryCatcher(
    db.query,
    'createUser'
  )(insertUser(email, username, hashedPassword));
};

// Get correct user function
const getCorrectUser =
  db =>
  async (email = null, username = null, compareFn) => {
    const user = await getFullUser(db)(email, username);

    // If no user data, return "unknown" error
    if (!user.data) {
      return {
        ok: false,
        code: 'unknown',
      };
    }

    // If user exist, compareFn hashes the password and compare with DB password
    const isPasswordCorrect = await compareFn(user.data.password);

    // If passwords doesn't match, return "unknown" error
    if (!isPasswordCorrect) {
      return {
        ok: false,
        code: 'unknown',
      };
    }

    // If passwords matches, return ok: true
    return {
      ok: true,
      data: { email: user.data.email },
    };
  };

// Update user function
const updateUserInfo = db => async (email, newEmail, newUsername) => {
  const user = await getFullUser(db)(email);

  if (!user.data) {
    return {
      ok: false,
      code: 'unknown',
    };
  }

  return await queryCatcher(
    db.query,
    'updateUserInfo'
  )(updateUser(email, newEmail, newUsername));
};

// Export functions
module.exports = {
  getFullUser,
  createUser,
  getCorrectUser,
  updateUserInfo,
};
