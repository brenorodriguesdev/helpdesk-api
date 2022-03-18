import { adaptMiddleware } from '../adapters/express-middleware'
import { makeVerifyLoginMiddleware } from '../factories/middlewares/verify-login'

export const verifyLogin = adaptMiddleware(makeVerifyLoginMiddleware())
