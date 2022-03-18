export const delegateTicketParamsSchema = {
  type: 'object',
  properties: {
    idToSuportLogin: {
      type: 'integer'
    },
    idTicket: {
      type: 'integer'
    }
  },
  required: ['idTicket']
}
