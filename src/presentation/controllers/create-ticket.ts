import { CreateTicketUseCase } from '../../domain/useCases/create-ticket'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, created, serverError } from '../contracts/http-helper'

export class CreateTicketController implements Controller {
  constructor (private readonly validator: Validator, private readonly createTicketUseCase: CreateTicketUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { login, subject, body } = httpRequest.body
      const result = await this.createTicketUseCase.create({
        idLoginClient: login.id,
        subject,
        body
      })
      if (result instanceof Error) {
        return badRequest(result)
      }
      return created()
    } catch (error) {
      return serverError()
    }
  }
}
