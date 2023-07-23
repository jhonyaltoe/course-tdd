import {
  type Authentication,
  type AuthenticationModel,
  type LoadAccountByEmailRepository,
  type Encrypter,
  type UpdateAccessTokenRepository,
  type HashCompare
} from './db-authentication.protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (!account) return null
    const isValid = await this.hashCompare.compare(authentication.password, account.password)
    if (!isValid) return null
    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.update(account.id, accessToken)
    return accessToken
  }
}
