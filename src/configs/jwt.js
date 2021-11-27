const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  JWT_SECERT: process.env.JWT_SECERT,
  OPTIONS: {
    algorithm: process.env.JWT_ALGO,
    expiresIn: '7d',
    issuer: 'const'
  },
};
