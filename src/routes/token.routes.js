const { getJwtToken } = require("../services/token.service")

async function routes(fastify, options) {

  fastify.get('/getToken/:userId', async (request, reply) => {
    const token = getJwtToken(fastify, request.params.userId);
    reply.send({ token })
  });
}


// CommonJs
module.exports = routes
