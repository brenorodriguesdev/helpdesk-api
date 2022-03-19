import { GetMessagesByTicketUseCase } from '../../domain/useCases/get-messages-by-ticket'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, ok, serverError } from '../contracts/http-helper'

export class GetMessagesByTicketController implements Controller {
  constructor (private readonly validator: Validator, private readonly getMessagesByTicketUseCase: GetMessagesByTicketUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { login, idTicket } = httpRequest.body
      const messages = await this.getMessagesByTicketUseCase.get({
        idLogin: login.id,
        idTicket
      })
      return ok(messages)
    } catch (error) {
      return serverError()
    }
  }
}
