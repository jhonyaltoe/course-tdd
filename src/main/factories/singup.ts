import { DbAddAccount } from '../../data/useCases/addAccount/db-addaccount'
import { BcryptAdapter } from '../../infra/cryptografy/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SingUpController } from '../../presentation/controllers/singUp/singup'
import { EmailValidatorAdapter } from '../../utils/email.validator-adapter'

export const makeSingUpController = (): SingUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  return new SingUpController(emailValidatorAdapter, dbAddAccount)
}
