import { type EmailValidator } from '../singUp/singup-protocols'
import { type HttpRequest, type HttpResponse, type Controller } from '../../protocols'
import { MissingParamError } from '../../errors'
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
    this.emailValidator.isValid(httpRequest.body.email)
    return {
      body: {},
      statusCode: 0
    } satisfies HttpResponse
  }
}
