import {
  signInPath,
  signUpPath,
  createTicketPath,
  suportTicketPath,
  finishTicketPath,
  sendMessagePath,
  receiveMessagesPath,
  readMessagesPath,
  delegateTicketPath,
  getTicketsByClientPath,
  getTicketsBySuportPath,
  getTicketsInQueuePath
} from './paths/'

export default {
  '/sign-in': signInPath,
  '/sign-up': signUpPath,
  '/create-ticket': createTicketPath,
  '/suport-ticket': suportTicketPath,
  '/finish-ticket': finishTicketPath,
  '/send-message': sendMessagePath,
  '/receive-messages': receiveMessagesPath,
  '/read-messages': readMessagesPath,
  '/delegate-ticket': delegateTicketPath,
  '/get-tickets-by-client': getTicketsByClientPath,
  '/get-tickets-by-suport': getTicketsBySuportPath,
  '/get-tickets-in-queue': getTicketsInQueuePath
}
