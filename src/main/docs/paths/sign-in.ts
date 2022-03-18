export const signInPath = {
  post: {
    tags: ['Login'],
    summary: 'API para logar',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signInParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'AccessToken retornado'
      }
    }
  }
}
