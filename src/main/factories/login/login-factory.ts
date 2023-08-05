import { type Controller } from '@presentation/protocols'
import env from '../../config/env'
import { LoginController } from '@presentation/controllers/login/login-controller'
import { DbAuthentication } from '@data/useCases/authentication/db-authentication'
import { LogMongoRepository } from '@infra/db/mongodb/log/log-mongo-repository'
import { AccountMongoRepository } from '@infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '@infra/cryptografy/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@infra/cryptografy/jwt-adapter/jwt-adapter'
import { makeLoginValidation } from './login-validation-factory'
import { LogContollerDecorator } from '../../decorators/log-controller-decorator'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogContollerDecorator(loginController, logMongoRepository)
}
