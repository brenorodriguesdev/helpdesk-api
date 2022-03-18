export const suportTicketPath = {
  patch: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Ticket'],
    summary: 'API para atualizar status do ticket para em suporte',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/suportTicketParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'atualizado status do ticket para em suporte'
      }
    }
  }
}
