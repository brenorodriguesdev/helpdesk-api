import { ReceiveMessagesUseCase } from '../../domain/useCases/receive-messages'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, noContent, serverError } from '../contracts/http-helper'

export class ReceiveMessagesController implements Controller {
  constructor (private readonly validator: Validator, private readonly receiveMessagesUseCase: ReceiveMessagesUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { login, idTicket } = httpRequest.body
      const result = await this.receiveMessagesUseCase.receive({
        idLoginReceive: login.id,
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
