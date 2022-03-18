import { Validator } from '../../../validation/contracts/validator'
import { CompositeValidator } from '../../../validation/validators/composite'
import { EmailValidator } from '../../../validation/validators/email'
import { RequiredFieldValidator } from '../../../validation/validators/required-field'

export const makeSignInValidator = (): Validator => {
  const requiredFields = ['email', 'password']
  const validators = []
  for (const requiredField of requiredFields) {
    validators.push(new RequiredFieldValidator(requiredField))
  }
  validators.push(new EmailValidator('email'))
  return new CompositeValidator(validators)
}
