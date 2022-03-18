import { VerifyIsSuportLoginMiddleware } from '../../presentation/middlewares/verify-is-suport-login'
import { adaptMiddleware } from '../adapters/express-middleware'

export const verifyIsSuportLogin = adaptMiddleware(new VerifyIsSuportLoginMiddleware())
