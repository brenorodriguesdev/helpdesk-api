export const createTicketPath = {
  post: {
    tags: ['Ticket'],
    summary: 'API para criar ticket',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createTicketParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'ticket criado'
      }
    }
  }
}
