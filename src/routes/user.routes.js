const { getUserData } = require("../controllers/user.controller")

async function routes(fastify, options) {

  fastify.get('/users', async (request, reply) => {
    reply.send(await getUserData())
  });

  const createUserOpts = {
    schema: {
      body: {
        type: 'object',
        /* content: {
            'application/json': {
                schema: { type: 'object' }
            }
        }, */
        required: ['userId', 'userName'],
        properties: {
          userId: { type: 'number', maxLength: 5 },
          userName: { type: 'string', minLength: 10 },
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          dateofbirth: { type: 'string' }
        }
      }
    }
  }

  fastify.post('/users/createuser', createUserOpts, async (request, reply) => {
    console.log(request.body)

    return request.body;
  });

}


// CommonJs
module.exports = routes
