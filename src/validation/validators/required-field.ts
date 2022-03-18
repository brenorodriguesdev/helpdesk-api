import { MissingParamError } from '../../presentation/errors/missing-param-error'
import { Validator } from '../contracts/validator'

export class RequiredFieldValidator implements Validator {
  constructor (private readonly fieldName: string) { }
  validate (data: any): Error {
    if (!data[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
