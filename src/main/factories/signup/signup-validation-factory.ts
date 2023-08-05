import { type Validation } from '@presentation/protocols'
import { RequiredFieldValidation, CompareFieldsValidation, EmailValidation, ValidationComposite } from '@presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../adapters/validators/email.validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', emailValidator))
  return new ValidationComposite(validations)
}
