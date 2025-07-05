const { default: fastify } = require("fastify");

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

module.exports = { getJwtToken }
