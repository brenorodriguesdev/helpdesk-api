export const finishTicketPath = {
  patch: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Ticket'],
    summary: 'API para finalizar o ticket',
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
      204: {
        description: 'ticket finalizado'
      }
    }
  }
}
