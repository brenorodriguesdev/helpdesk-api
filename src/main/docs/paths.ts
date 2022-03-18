import {
  signInPath,
  signUpPath,
  createTicketPath,
  suportTicketPath,
  finishTicketPath,
  sendMessagePath
} from './paths/'

export default {
  '/sign-in': signInPath,
  '/sign-up': signUpPath,
  '/create-ticket': createTicketPath,
  '/suport-ticket': suportTicketPath,
  '/finish-ticket': finishTicketPath,
  '/send-message': sendMessagePath
}
