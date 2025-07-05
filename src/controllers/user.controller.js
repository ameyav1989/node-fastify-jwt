const { default: fastify } = require("fastify");
const { sql } = require("@sequelize/core")
const { sequelizePostgres } = require("../database/db.service")

const getUserData = async (username) => {
  // const userData = await sequelize.query(sql`SELECT * FROM users WHERE id = ${username}`);
  const [userData, metadata] = await sequelizePostgres.query(sql`SELECT * FROM services.users`);
  // console.log(userData)
  return userData;
}


module.exports = { getUserData }
