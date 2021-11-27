const Sequelize = require('sequelize');
const dbConfig = require('../configs/db');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

let sequelize;
if (dbConfig.IS_SQLITE) {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbConfig.SQLITE_PATH,
    logging: true,
  });
} else {
  sequelize = new Sequelize(
    dbConfig.RDS_DATABASE,
    dbConfig.RDS_USERNAME,
    dbConfig.RDS_PASSWORD,
    {
      host: dbConfig.RDS_HOSTNAME,
      port: dbConfig.RDS_PORT,
      dialect: 'mysql',
      logging: true,
    },
  );
}

const modules = {};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    modules[model.name] = model;
  });

Object.keys(modules).forEach(modelName => {
  if (modules[modelName].associate) {
    modules[modelName].associate(modules);
  }
});

modules.sequelize = sequelize;
modules.Sequelize = Sequelize;

if (process.env.NODE_ENV !== 'test') {
  modules.sequelize
    .sync()
    .then(() => {
      logger.log('DB connected ...');
    })
    .catch(err => {
      logger.log('DB connection failed: ' + err);
    });
}

module.exports = modules;
