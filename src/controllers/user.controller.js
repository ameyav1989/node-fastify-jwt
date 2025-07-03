const { default: fastify } = require("fastify");
const { sql } = require("@sequelize/core")
const { sequelizePostgres } = require("../database/db.service")

const getJwtToken = (fastify, userId) => {

  const accessTokenExpiryIn = "1 day";
  const refreshTokenExpiryIn = "7 days";
  const accessTokenOptions = {
    sub: userId,
    expiresIn: accessTokenExpiryIn
  }
  const accessToken = fastify.jwt.sign({ accessTokenOptions });
  const refreshTokenOptions = {
    sub: userId,
    expiresIn: refreshTokenExpiryIn
  }
  const refreshToken = fastify.jwt.sign({ refreshTokenOptions });

  return { accessToken, refreshToken }
}

const verifyToken = (fastify, token) => {



}

const getUserData = async (username) => {
  // const userData = await sequelize.query(sql`SELECT * FROM users WHERE id = ${username}`);
  const [userData, metadata] = await sequelizePostgres.query(sql`SELECT * FROM services.users`);
  // console.log(userData)
  return userData;
}


module.exports = { getJwtToken, verifyToken, getUserData }
