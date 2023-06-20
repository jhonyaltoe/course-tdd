import { type AccountModel } from '../../domain/models'
import { type AddAccountModel } from '../../domain/useCases'

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
