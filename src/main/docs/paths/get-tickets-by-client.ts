export const getTicketsByClientPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Ticket'],
    summary: 'API para retornar os tickets por cliente',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/finishTicketParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'tickets retornados'
      }
    }
  }
}
