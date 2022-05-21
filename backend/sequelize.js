const { Sequelize } = require("sequelize");
const dbConfig = require("./config/db.config.js");

console.log(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD);
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
