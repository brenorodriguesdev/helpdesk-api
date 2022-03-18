export const createTicketParamsSchema = {
  type: 'object',
  properties: {
    subject: {
      type: 'string'
    },
    body: {
      type: 'string'
    }
  },
  required: ['subject', 'body']
}
