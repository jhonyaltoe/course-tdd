import { type AddAccountRepository } from '../../../../data/protocols'
import { type AccountModel } from '../../../../domain/models'
import { type AddAccountModel } from '../../../../domain/useCases'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = {
      id: (await accountCollection.insertOne(accountData)).insertedId.toString(),
      ...accountData
    }
    return account
  }
}
