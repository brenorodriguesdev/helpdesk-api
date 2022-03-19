import { GetTicketsBySuportUseCase } from '../../domain/useCases/get-tickets-by-suport'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, ok, serverError } from '../contracts/http-helper'

export class GetTicketsBySuportController implements Controller {
  constructor (private readonly validator: Validator, private readonly getTicketsBySuportUseCase: GetTicketsBySuportUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { login } = httpRequest.body
      const tickets = await this.getTicketsBySuportUseCase.get(login.id)
      return ok(tickets)
    } catch (error) {
      return serverError()
    }
  }
}
