import { type HttpRequest, type HttpResponse, type Controller } from '../../presentation/protocols'

export class LogContollerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(httpRequest)
    return { body: 'any_value', statusCode: 0 } satisfies HttpResponse
  }
}
