import { ReadMessagesUseCase } from '../../domain/useCases/read-messages'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, noContent, serverError } from '../contracts/http-helper'

export class ReadMessagesController implements Controller {
  constructor (private readonly validator: Validator, private readonly readMessagesUseCase: ReadMessagesUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { login, idTicket } = httpRequest.body
      const result = await this.readMessagesUseCase.read({
        idLoginRead: login.id,
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
