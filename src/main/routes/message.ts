import { Router } from 'express'
import { adaptRouter } from '../adapters/express-controller'
import { makeGetMessagesByTicketController } from '../factories/controllers/get-messages-by-ticket'
import { makeReadMessagesController } from '../factories/controllers/read-messages'
import { makeReceiveMessagesController } from '../factories/controllers/receive-messages'
import { makeSendMessageController } from '../factories/controllers/send-message'
import { verifyLogin } from '../middlewares/verify-login'

export default (router: Router): void => {
  router.post('/send-message', verifyLogin, adaptRouter(makeSendMessageController()))
  router.put('/receive-messages', verifyLogin, adaptRouter(makeReceiveMessagesController()))
  router.put('/read-messages', verifyLogin, adaptRouter(makeReadMessagesController()))
  router.get('/get-messages-by-ticket/:idTicket', verifyLogin, adaptRouter(makeGetMessagesByTicketController()))
}
