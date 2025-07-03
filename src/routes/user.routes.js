const { getJwtToken } = require("../controllers/user.controller")

async function userRoutes(fastify, options) {

    fastify.get('/users/getToken/:userId', async(request, reply) => {
        const token = getJwtToken(fastify, request.params.userId);
        reply.send({ token })
    });


    fastify.get('/users', async(request, reply) => {
        reply.send({ hello: 'world111' })
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

    fastify.post('/users/createuser', createUserOpts, async(request, reply) => {
        console.log(request.body)




        return request.body;
    });

}


// CommonJs
module.exports = userRoutes