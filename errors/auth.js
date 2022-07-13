module.exports = {
  generic: {
    empty: {
      statusCode: 400,
      error: new Error('all fields are mandatory'),
    },
  },
  register: {
    duplication: {
      statusCode: 400,
      error: new Error('user already exists'),
    },
  },
  login: {
    emptyUser: {
      statusCode: 400,
      error: new Error('email or username are mandatory'),
    },
    emptyPassword: {
      statusCode: 400,
      error: new Error('password is mandatory'),
    },
    unknown: {
      statusCode: 400,
      error: new Error('user or password incorrect'),
    },
  },
};
