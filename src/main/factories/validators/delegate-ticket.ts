import { Validator } from '../../../validation/contracts/validator'
import { CompositeValidator } from '../../../validation/validators/composite'
import { RequiredFieldValidator } from '../../../validation/validators/required-field'

export const makeDelegateTicketValidator = (): Validator => {
  const requiredFields = ['login', 'idTicket', 'idToSuportLogin']
  const validators = []
  for (const requiredField of requiredFields) {
    validators.push(new RequiredFieldValidator(requiredField))
  }
  return new CompositeValidator(validators)
}
