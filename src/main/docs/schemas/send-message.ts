export const sendMessageParamsSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'string'
    },
    idTicket: {
      type: 'integer'
    }
  },
  required: ['body', 'idTicket']
}
