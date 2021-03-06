import { Router } from 'express'
import { adaptRouter } from '../adapters/express-controller'
import { makeCreateTicketController } from '../factories/controllers/create-ticket'
import { makeDelegateTicketController } from '../factories/controllers/delegate-ticket'
import { makeFinishTicketController } from '../factories/controllers/finish-ticket'
import { makeGetTicketsByClientController } from '../factories/controllers/get-tickets-by-client'
import { makeGetTicketsBySuportController } from '../factories/controllers/get-tickets-by-suport'
import { makeGetTicketsInQueueController } from '../factories/controllers/get-tickets-in-queue'
import { makeSuportTicketController } from '../factories/controllers/suport-ticket'
import { verifyIsSuportLogin } from '../middlewares/verify-is-suport-login'
import { verifyLogin } from '../middlewares/verify-login'

export default (router: Router): void => {
  router.post('/create-ticket', verifyLogin, adaptRouter(makeCreateTicketController()))
  router.patch('/suport-ticket', verifyLogin, verifyIsSuportLogin, adaptRouter(makeSuportTicketController()))
  router.patch('/finish-ticket', verifyLogin, verifyIsSuportLogin, adaptRouter(makeFinishTicketController()))
  router.patch('/delegate-ticket', verifyLogin, verifyIsSuportLogin, adaptRouter(makeDelegateTicketController()))
  router.get('/get-tickets-by-client', verifyLogin, adaptRouter(makeGetTicketsByClientController()))
  router.get('/get-tickets-by-suport', verifyLogin, verifyIsSuportLogin, adaptRouter(makeGetTicketsBySuportController()))
  router.get('/get-tickets-in-queue', verifyLogin, verifyIsSuportLogin, adaptRouter(makeGetTicketsInQueueController()))
}
