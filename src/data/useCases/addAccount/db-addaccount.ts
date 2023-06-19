import { type AccountModel, type AddAccountModel, type AddAccount, type Encrypter } from './db-addaccount-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await Promise.resolve({
      id: 'any-id',
      name: 'any-name',
      email: 'any-email@mail.com',
      password: 'any-password'
    })
  }
}
