import { type HttpRequest, type HttpResponse } from '../protocols'
import { MissingParamErrors } from '../errors'
import { badRequest } from '../helpers'

export class SingUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamErrors('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamErrors('email'))
    }
  }
}
