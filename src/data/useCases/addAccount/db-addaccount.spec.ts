import { type AddAccount } from '../../../domain/useCases'
import { type Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-addaccount'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('hashed-password')
    }
  }
  return new EncrypterStub()
}

interface SutType {
  sut: AddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutType => {
  const encrypterStub = makeEncrypter()
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
