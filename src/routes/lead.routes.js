const { getLeadData } = require("../controllers/lead.controller")

async function leadRoutes(fastify, options) {
  fastify.get('/leads/:leadId', async (request, reply) => {
    return getLeadData(request.params.leadId)
  });

  const createLeadOpts = {
    schema: {
      body: {
        type: 'object',
        /* content: {
            'application/json': {
                schema: { type: 'object' }
            }
        }, */
        required: ['leadId', 'leadName'],
        properties: {
          leadId: { type: 'number', maxLength: 5 },
          leadName: { type: 'string', minLength: 30 }
        }
      }
    }
  }

  fastify.post('/leads/createlead', createLeadOpts, async (request, reply) => {
    console.log(request.body)
    return request.body;
  });
}


// CommonJs
module.exports = leadRoutes