const jwt = require('fastify-jwt');

module.exports = (fastify) => {

    fastify.register(jwt, {
        secret: '' // Replace with a secure key. This would be client key for different platforms
    });

    fastify.addHook('onRequest', async (request, reply) => {
        try {
            if(request.url.indexOf("getToken") == -1)
                await request.jwtVerify();
        } catch (err) {
            reply.code(401).send({ error: 'Unauthorized' });
        }
    });

    // Declare a route
    fastify.register(require("./user.routes"),{ prefix: '/api' })
    fastify.register(require("./lead.routes"),{ prefix: '/api' })
}