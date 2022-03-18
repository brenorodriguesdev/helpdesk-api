export const readMessagesParamsSchema = {
  type: 'object',
  properties: {
    idTicket: {
      type: 'integer'
    }
  },
  required: ['idTicket']
}
