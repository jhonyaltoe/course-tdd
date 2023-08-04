import { type Router } from 'express'
import { makeSingUpController } from '../factories/singup/singup'
import { adapterRoute } from '../adapters/express/express-routes-adapter'

export default (router: Router): void => {
  router.post('/singup', adapterRoute(makeSingUpController()))
}
