const { sql } = require('slonik');

// Select user from DB function
const selectUser = (email, username) => {
  return sql`
    SELECT * FROM users
    WHERE email = ${email}
    OR username = ${username}
`;
};

// Insert user into DB function
const insertUser = (email, username, hashedPassword) => {
  return sql`
    INSERT INTO users (
        email, username, password
    ) VALUES (
        ${email}, ${username}, ${hashedPassword}
    )
  `;
};

// Edit existing user function
const updateUser = (email, newEmail, newUsername) => {
  return sql`
    UPDATE users
    SET email = ${newEmail}, username = ${newUsername}
    WHERE email = ${email}
  `;
};

module.exports = {
  selectUser,
  insertUser,
  updateUser,
};
