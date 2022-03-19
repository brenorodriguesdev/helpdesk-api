import { GetTicketsByClientUseCase } from '../../domain/useCases/get-tickets-by-client'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, ok, serverError } from '../contracts/http-helper'

export class GetTicketsByClientController implements Controller {
  constructor (private readonly validator: Validator, private readonly getTicketsByClientUseCase: GetTicketsByClientUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { login } = httpRequest.body
      const tickets = await this.getTicketsByClientUseCase.get(login.id)
      return ok(tickets)
    } catch (error) {
      return serverError()
    }
  }
}
