import { type AddAccount } from '../../../domain/useCases'
import { type Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-addaccount'

interface SutType {
  sut: AddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutType => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('hashed-password')
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid-name',
      email: 'valid-email@mail.com',
      password: 'valid-password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid-password')
  })
})
