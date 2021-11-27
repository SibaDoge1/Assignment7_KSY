const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  RDS_DATABASE: process.env.RDS_DATABASE,
  RDS_USERNAME: process.env.RDS_USERNAME,
  RDS_PASSWORD: process.env.RDS_PASSWORD,
  RDS_HOSTNAME: process.env.RDS_HOSTNAME,
  RDS_PORT: process.env.RDS_PORT,
  IS_SQLITE: JSON.parse(process.env.IS_SQLITE),
  SQLITE_PATH: process.env.SQLITE_PATH
};
