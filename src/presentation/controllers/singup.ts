import { type HttpRequest, type HttpResponse } from '../protocols'
import { MissingParamErrors } from '../errors'
import { badRequest } from '../helpers'

export class SingUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamErrors(field))
      }
    }
  }
}
