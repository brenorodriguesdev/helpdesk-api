import { SendMessageUseCase } from '../../domain/useCases/send-message'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, created, serverError } from '../contracts/http-helper'

export class SendMessageController implements Controller {
  constructor (private readonly validator: Validator, private readonly sendMessageUseCase: SendMessageUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { login, idTicket, body } = httpRequest.body
      const result = await this.sendMessageUseCase.send({
        idLoginSend: login.id,
        idTicket,
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
