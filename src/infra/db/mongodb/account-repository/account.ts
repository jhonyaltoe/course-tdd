import { type AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/useCases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(accountData) // inserOne modify accountData adding _id key
    return MongoHelper.map(accountData) // map rename _id key to id
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
