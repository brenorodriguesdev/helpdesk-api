import { SignInUseCase } from '../../domain/useCases/sign-in'
import { Validator } from '../../validation/contracts/validator'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { badRequest, ok, serverError } from '../contracts/http-helper'

export class SignInController implements Controller {
  constructor (private readonly validator: Validator, private readonly signInUseCase: SignInUseCase) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.signInUseCase.sign({
        email,
        password
      })

      if (accessToken instanceof Error) {
        return badRequest(accessToken)
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError()
    }
  }
}
