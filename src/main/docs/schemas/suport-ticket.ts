export const suportTicketParamsSchema = {
  type: 'object',
  properties: {
    idTicket: {
      type: 'integer'
    }
  },
  required: ['idTicket']
}
