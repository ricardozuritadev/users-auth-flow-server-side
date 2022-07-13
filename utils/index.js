const hash = require('./hash');
const jwt = require('./jwt');
const cookie = require('./cookie');

// SERIALIZE FUNCTION
const serialize = (res, payload) => {
  const token = jwt.sign(payload);
  cookie.create(res, token);
};

// DESERIALIZE FUNCTION
const deserialize = req => {
  // Read cookies from req.cookies
  const { access_token } = req.cookies;

  // Verify JWT with verify() fn
  const payload = jwt.verify(access_token);

  // If payload is false, return false
  if (!payload) return false;

  // If payload is tru, return payload
  return payload;
};

module.exports = {
  hash,
  jwt,
  cookie,
  serialize,
  deserialize,
};
