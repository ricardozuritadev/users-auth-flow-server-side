// Create cookie function
const create = (res, token, expTime = 300000) => {
  res.cookie('access_token', token, {
    expires: new Date(Date.now() + expTime),
    secure: false,
    httpOnly: true,
  });
};

// Remove cookie function
const clear = res => {
  res.clearCookie('access_token');
};

module.exports = {
  create,
  clear,
};
