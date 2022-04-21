const { Sequelize } = require("sequelize");
const dbConfig = require("./config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

module.exports = sequelize;
