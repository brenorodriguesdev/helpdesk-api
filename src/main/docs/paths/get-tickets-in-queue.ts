export const getTicketsInQueuePath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Ticket'],
    summary: 'API para retornar os tickets em atendimento',
    responses: {
      200: {
        description: 'tickets retornados'
      }
    }
  }
}
