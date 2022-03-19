export const getTicketsByClientPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Ticket'],
    summary: 'API para retornar os tickets por cliente',
    responses: {
      200: {
        description: 'tickets retornados'
      }
    }
  }
}
