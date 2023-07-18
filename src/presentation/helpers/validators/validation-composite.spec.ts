import { type Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return null
      }
    }
    const validationStub: Validation = new ValidationStub()
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(new Error('validate error'))
    const sut = new ValidationComposite([validationStub, validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error('validate error'))
    expect(error?.message).toBe('validate error')
  })
})
