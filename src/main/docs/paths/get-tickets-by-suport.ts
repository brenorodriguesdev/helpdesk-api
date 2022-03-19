export const getTicketsBySuportPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Ticket'],
    summary: 'API para retornar os tickets por atendente',
    responses: {
      200: {
        description: 'tickets retornados'
      }
    }
  }
}
