import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = String(process.env.DB_DATABASE);
const dbHost = String(process.env.DB_HOST) || '127.0.0.1';
const dbPort = Number(process.env.DB_PORT);
const dbUsername = String(process.env.DB_USERNAME);
const dbPassword = String(process.env.DB_PASSWORD);
const dbDialect = process.env.DB_DIALECT;

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: dbDialect as Dialect,
    logging: false,
    timezone: process.env.TZ || 'Asia/Jakarta'
});

export default sequelizeConnection;
