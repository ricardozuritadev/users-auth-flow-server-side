module.exports = {
  getUserInfo: {
    unknown: {
      statusCode: 400,
      error: new Error('user does not exist'),
    },
  },
};
