export const signUpPath = {
  post: {
    tags: ['Login'],
    summary: 'API para criar login',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Login criado'
      }
    }
  }
}
