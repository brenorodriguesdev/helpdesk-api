import { Router } from 'express'
import { adaptRouter } from '../adapters/express-controller'
import { makeReadMessagesController } from '../factories/controllers/read-messages'
import { makeReceiveMessagesController } from '../factories/controllers/receive-messages'
import { makeSendMessageController } from '../factories/controllers/send-message'
import { verifyLogin } from '../middlewares/verify-login'

export default (router: Router): void => {
  router.post('/send-message', verifyLogin, adaptRouter(makeSendMessageController()))
  router.put('/receive-messages', verifyLogin, adaptRouter(makeReceiveMessagesController()))
  router.put('/read-messages', verifyLogin, adaptRouter(makeReadMessagesController()))
}
