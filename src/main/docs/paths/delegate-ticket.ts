export const delegateTicketPath = {
  patch: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Ticket'],
    summary: 'API para delegar o ticket',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/delegateTicketParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'ticket delegado'
      }
    }
  }
}
