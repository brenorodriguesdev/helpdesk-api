import { Router } from 'express'
import { adaptRouter } from '../adapters/express-controller'
import { makeCreateTicketController } from '../factories/controllers/create-ticket'
import { verifyLogin } from '../middlewares/verify-login'

export default (router: Router): void => {
  router.post('/create-ticket', verifyLogin, adaptRouter(makeCreateTicketController()))
}
