export const sendMessagePath = {
  post: {
    security: [{
      bearerAuth: []
    }],
    tags: ['Message'],
    summary: 'API para enviar mensagem',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/sendMessageParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'mensagem enviada'
      }
    }
  }
}
