import { Router } from 'express'
import { adaptRouter } from '../adapters/express-controller'
import { makeCreateTicketController } from '../factories/controllers/create-ticket'
import { makeSuportTicketController } from '../factories/controllers/suport-ticket'
import { verifyIsSuportLogin } from '../middlewares/verify-is-suport-login'
import { verifyLogin } from '../middlewares/verify-login'

export default (router: Router): void => {
  router.post('/create-ticket', verifyLogin, adaptRouter(makeCreateTicketController()))
  router.patch('/suport-ticket', verifyLogin, verifyIsSuportLogin, adaptRouter(makeSuportTicketController()))
}
