import { FinishTicketUseCase } from '../../domain/useCases/finish-ticket'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, noContent, serverError } from '../contracts/http-helper'

export class FinishTicketController implements Controller {
  constructor (private readonly validator: Validator, private readonly finishTicketUseCase: FinishTicketUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { idTicket } = httpRequest.body
      const result = await this.finishTicketUseCase.finish(idTicket)
      if (result instanceof Error) {
        return badRequest(result)
      }
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
