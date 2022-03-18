export const finishTicketParamsSchema = {
  type: 'object',
  properties: {
    idTicket: {
      type: 'integer'
    }
  },
  required: ['idTicket']
}
