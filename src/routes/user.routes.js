const { getUserData, createNewUser } = require("../controllers/user.controller")

async function routes(fastify, options) {

  fastify.get('/users', async (request, reply) => {
    reply.send(await getUserData())
  });

  const createUserOpts = {
    schema: {
      body: {
        type: 'object',
        required: ['userName', 'firstname', 'lastname', 'dateofbirth', 'email', 'mobileNo'],
        properties: {
          // userId: { type: 'number' },
          userName: { type: 'string', minLength: 5, maxLength: 20, pattern: '^[a-zA-Z]+$' },
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          dateofbirth: { type: 'string' },
          email: { type: 'string' ,format: 'email', maxLength: 100},
          mobileNo: { type: 'string',  pattern: '^\\+?[5-9]\\d{1,14}$' }
        }
      }
    }
  }

  fastify.post('/users/createuser', createUserOpts, async (request, reply) => {
    try {
      const userData = request.body;
      
      // Data is already validated by your schema, but you can add extra validation            
      const result = await createNewUser(userData);
      reply.code(201).send({ 
        message: 'User created successfully', 
        user: result 
      });
    } catch (error) {
      reply.code(500).send({ 
        error: 'Failed to create user', 
        message: error.message 
      });
    }
  });

}


// CommonJs
module.exports = routes
