import { Router } from 'express'
import { adaptRouter } from '../adapters/express-controller'
import { makeSignInController } from '../factories/controllers/sign-in'
import { makeSignUpController } from '../factories/controllers/sign-up'

export default (router: Router): void => {
  router.post('/sign-in', adaptRouter(makeSignInController()))
  router.post('/sign-up', adaptRouter(makeSignUpController()))
}
