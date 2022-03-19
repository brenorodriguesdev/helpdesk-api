import { GetMessagesByTicketUseCase } from '../../domain/useCases/get-messages-by-ticket'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, ok, serverError } from '../contracts/http-helper'
import { MissingParamError } from '../errors/missing-param-error'

export class GetMessagesByTicketController implements Controller {
  constructor (private readonly validator: Validator, private readonly getMessagesByTicketUseCase: GetMessagesByTicketUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      if (!httpRequest.params.idTicket) {
        const missingParamError = new MissingParamError('idTicket')
        return badRequest(missingParamError)
      }
      const { login } = httpRequest.body
      const messages = await this.getMessagesByTicketUseCase.get({
        idLogin: login.id,
        idTicket: httpRequest.params.idTicket
      })
      return ok(messages)
    } catch (error) {
      return serverError()
    }
  }
}
