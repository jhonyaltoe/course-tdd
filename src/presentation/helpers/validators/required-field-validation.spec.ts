import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('non-existent_field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('non-existent_field'))
  })
})
