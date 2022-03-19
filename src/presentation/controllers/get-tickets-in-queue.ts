import { GetTicketsInQueueUseCase } from '../../domain/useCases/get-tickets-in-queue'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { ok, serverError } from '../contracts/http-helper'

export class GetTicketsInQueueController implements Controller {
  constructor (private readonly getTicketsInQueueUseCase: GetTicketsInQueueUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const tickets = await this.getTicketsInQueueUseCase.get()
      return ok(tickets)
    } catch (error) {
      return serverError()
    }
  }
}
