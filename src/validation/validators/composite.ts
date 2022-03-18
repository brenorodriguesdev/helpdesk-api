import { Validator } from '../contracts/validator'

export class CompositeValidator implements Validator {
  constructor (private readonly validators: Validator[]) { }
  validate (data: any): Error {
    for (const validator of this.validators) {
      const error = validator.validate(data)
      if (error) {
        return error
      }
    }
  }
}
