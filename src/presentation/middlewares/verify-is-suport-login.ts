import { HttpRequest, HttpResponse } from '../contracts/http'
import { ok, serverError, unauthorized } from '../contracts/http-helper'
import { Middleware } from '../contracts/middleware'

export class VerifyIsSuportLoginMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { login } = httpRequest.body
      const error = new Error('Esse usuário não tem permissão para executar essa função!')
      if (!login) {
        return unauthorized(error)
      }
      const isSuportLogin = login?.type?.id === 2
      if (!isSuportLogin) {
        return unauthorized(error)
      }
      return ok({ login })
    } catch (error) {
      return serverError()
    }
  }
}
