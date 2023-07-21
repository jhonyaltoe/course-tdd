import { type AuthenticationModel, type Authentication } from '../../../domain/useCases'
import { type LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { type TokenGenerator, type HashCompare } from '../../protocols/cryptografy'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (!account) return null
    await this.hashCompare.compare(authentication.password, account.password)
    await this.tokenGenerator.generate(account.id)
    return null
  }
}
