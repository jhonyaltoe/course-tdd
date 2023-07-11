import { type Authentication, type EmailValidator } from '../singUp/singup-protocols'
import { type HttpRequest, type HttpResponse, type Controller } from '../../protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, unauthorized } from '../../helpers'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return {
        body: {},
        statusCode: 0
      } satisfies HttpResponse
    } catch (error) {
      return serverError(error)
    }
  }
}
