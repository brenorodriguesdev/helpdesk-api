import { SuportTicketUseCase } from '../../domain/useCases/suport-ticker'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, noContent, serverError } from '../contracts/http-helper'

export class SuportTicketController implements Controller {
  constructor (private readonly validator: Validator, private readonly suportTicketUseCase: SuportTicketUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { login, idTicket } = httpRequest.body
      const result = await this.suportTicketUseCase.suport({
        idLoginSuport: login.id,
        idTicket
      })
      if (result instanceof Error) {
        return badRequest(result)
      }
      return noContent()
    } catch (error) {
      console.log(error.message)
      return serverError()
    }
  }
}
