import { type Validation, RequiredFieldValidation, CompareFieldsValidation } from '../../presentation/helpers/validators'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
