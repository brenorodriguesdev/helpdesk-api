import { VerifyLoginUseCase } from '../../domain/useCases/verify-login'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { ok, serverError, unauthorized } from '../contracts/http-helper'
import { Middleware } from '../contracts/middleware'

export class VerifyLoginMiddleware implements Middleware {
  constructor (private readonly verifyLoginUseCase: VerifyLoginUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { authorization } = httpRequest.headers
      const [, accessToken] = authorization ? authorization.split('Bearer ') : ''
      const login = await this.verifyLoginUseCase.verify(accessToken)
      if (login instanceof Error) {
        return unauthorized(login)
      }
      return ok({ login })
    } catch (error) {
      return serverError()
    }
  }
}
