import { type EmailValidator } from '../singUp/singup-protocols'
import { type HttpRequest, type HttpResponse, type Controller } from '../../protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
    return {
      body: {},
      statusCode: 0
    } satisfies HttpResponse
  }
}
