import { Router } from 'express'
import { adaptRouter } from '../adapters/express-controller'
import { makeSendMessageController } from '../factories/controllers/send-message'
import { verifyLogin } from '../middlewares/verify-login'

export default (router: Router): void => {
  router.post('/send-message', verifyLogin, adaptRouter(makeSendMessageController()))
}
