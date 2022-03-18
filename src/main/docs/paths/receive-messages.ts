export const receiveMessagesPath = {
  put: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Message'],
    summary: 'API para atualizar o status das mensagens de um ticket para recebido',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/receiveMessagesParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'status das mensagens alterado para recebido'
      }
    }
  }
}
