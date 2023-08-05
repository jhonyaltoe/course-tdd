import { type Router } from 'express'
import { adapterRoute } from '../adapters/express/express-routes-adapter'
import { makeSingUpController } from '../factories/singup/singup'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
  router.post('/singup', adapterRoute(makeSingUpController()))
  router.post('/login', adapterRoute(makeLoginController()))
}
