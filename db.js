import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const user = process.env.DBUSER;
const password = process.env.DBPWD;
const host = process.env.DBHOST;
const port = process.env.DBPORT;
const dbname = process.env.DBNAME;

// postgres://user:password@host:port/dbname
const dbconfig = `postgres://${user}:${password}@${host}:${port}/${dbname}`;

export const sequelize = new Sequelize(dbconfig, {
  // https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  sync: { force: true },
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
  omitNull: true,
});
