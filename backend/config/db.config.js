require("dotenv").config();
module.exports = {
  HOST: process.env.DB_HOST || "192.168.64.27", //minikube ip で調べる必要がある
  USER: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASS || "root",
  DB: process.env.DB_DATBASE || "postgres",
  dialect: "postgres",
  port: process.env.DB_PORT || 30008,
};
