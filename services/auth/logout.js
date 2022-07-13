const { cookie } = require('../../utils');

module.exports = async (_, res, __) => {
  // Remove cookie with clear() fn
  cookie.clear(res);

  // Return succes true to client
  res.status(200).json({
    success: true,
  });
};
