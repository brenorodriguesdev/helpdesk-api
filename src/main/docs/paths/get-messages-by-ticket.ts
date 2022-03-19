export const getMessagesByTicketPath = {
  get: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Message'],
    summary: 'API para retornar as mensangens por ticket',
    parameters: [{
      in: 'path',
      name: 'idTicket',
      description: 'ID do ticket',
      required: true,
      schema: {
        type: 'integer'
      }
    }],
    responses: {
      200: {
        description: 'mensagens retornados'
      }
    }
  }
}
