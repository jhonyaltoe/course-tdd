import { type HttpRequest, type Controller, type HttpResponse } from '../../presentation/protocols'
import { type Request, type Response } from 'express'

export const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
