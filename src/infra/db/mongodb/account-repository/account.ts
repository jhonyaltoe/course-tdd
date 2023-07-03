import { type AddAccountRepository } from '../../../../data/protocols'
import { type AccountModel } from '../../../../domain/models'
import { type AddAccountModel } from '../../../../domain/useCases'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(accountData) // inserOne modify accountData adding _id key
    return MongoHelper.map(accountData) // map rename _id key to id
  }
}
