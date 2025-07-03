
console.log("./environment" + `/.env.${process.env.NODE_ENV || "development"}`)
require('dotenv').config({ path: "./environment" + `/.env.${process.env.NODE_ENV || "development"}` })
const fastify = require('fastify')({
  logger: true
})

require("./src/routes/common")(fastify);

fastify.listen({ port: 3000, host: 'localhost' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})