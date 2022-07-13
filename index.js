// MODULES
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./configs/db');
const options = require('./configs/cors');
const errors = require('./errors/commons');

const app = express();

//MIDDLEWARES
// Cors
app.use(cors(options));
// Body and cookie parsers
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1', require('./services')(db));

// Undefined routes
app.use((_, __, next) => {
  return next(errors[404]);
});
// Error middleware
app.use(({ statusCode, error }, _, res, __) => {
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
});

// SERVER CONECTION
app.listen(process.env.PORT || 5000, () => {
  console.log(`> Listening at: ${process.env.PORT || 5000}`);
});

module.exports = app;
