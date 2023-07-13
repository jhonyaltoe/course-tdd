import { InvalidParamError } from '../../errors'
import { type EmailValidator } from '../../protocols/email-validator'
import { EmailValidation } from './email-validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutType {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (fieldName: string): SutType => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation(fieldName, emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut('email')
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@mail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return an error if email validator returns false', () => {
    const { sut, emailValidatorStub } = makeSut('email')
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValue(false)
    const error = sut.validate({ email: 'invalid_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut('email')
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('Email validator stub error')
    })
    const sutExec = (): void => {
      sut.validate({ email: 'any_email@mail.com' })
    }
    expect(sutExec).toThrowError(/Email validator stub error$/)
  })
})
