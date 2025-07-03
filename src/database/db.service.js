const Sequelize = require('@sequelize/core');
const { PostgresDialect } = require('@sequelize/postgres');

const sequelizePostgres = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.PG_DB_NAME,
    user: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASS,
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT,
    ssl: false,
    clientMinMessages: 'notice'
});


module.exports = { sequelizePostgres };