import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'
import { type HttpRequest, type HttpResponse, type Controller } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }
    throw new Error('No return implemented')
  }
}
