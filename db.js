const { Sequelize } = require("sequelize");
require("dotenv").config();

const user = process.env.DBUSER;
const password = process.env.DBPWD;
const host = process.env.DBHOST;
const port = process.env.DBPORT;
const dbname = process.env.DBNAME;

// postgres://user:password@host:port/dbname
const dbconfig = `postgres://${user}:${password}@${host}:${port}/${dbname}`;

const sequelize = new Sequelize(dbconfig, {
  // https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor
  sync: { force: true },
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
});

module.exports = sequelize;
