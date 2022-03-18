export const readMessagesPath = {
  patch: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Message'],
    summary: 'API para atualizar o status das mensagens de um ticket para lido',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/readMessagesParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'status das mensagens alterado para lido'
      }
    }
  }
}
