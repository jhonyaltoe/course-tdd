import { type Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub: Validation = makeValidation()
  const sut = new ValidationComposite([validationStub, validationStub])
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    const validationError = new Error('validation error')
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(validationError)
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(validationError)
  })
})
