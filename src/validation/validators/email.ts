
import { Validator } from '../contracts/validator'
import { InvalidParamError } from '../../presentation/errors/invalid-param-error'
import validator from 'validator'

export class EmailValidator implements Validator {
  constructor (private readonly fieldName: string) { }
  validate (data: any): Error {
    if (!validator.isEmail(data[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
