import { DelegateTicketUseCase } from '../../domain/useCases/delegate-ticket'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, noContent, serverError } from '../contracts/http-helper'

export class DelegateTicketController implements Controller {
  constructor (private readonly validator: Validator, private readonly delegateTicketUseCase: DelegateTicketUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { login, idToSuportLogin, idTicket } = httpRequest.body
      const result = await this.delegateTicketUseCase.delegate({
        idFromSuportLogin: login.id,
        idToSuportLogin,
        idTicket
      })
      if (result instanceof Error) {
        return badRequest(result)
      }
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
