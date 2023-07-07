import { type Controller } from '../../presentation/protocols'
import { DbAddAccount } from '../../data/useCases/addAccount/db-addaccount'
import { BcryptAdapter } from '../../infra/cryptografy/bcrypt-adapter'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SingUpController } from '../../presentation/controllers/singUp/singup'
import { EmailValidatorAdapter } from '../../utils/email.validator-adapter'
import { LogContollerDecorator } from '../decorators/log'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const logMongoRepository = new LogMongoRepository()
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const singUpController = new SingUpController(emailValidatorAdapter, dbAddAccount)
  return new LogContollerDecorator(singUpController, logMongoRepository)
}
