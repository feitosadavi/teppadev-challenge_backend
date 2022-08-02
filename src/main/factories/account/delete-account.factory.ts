import { DeleteAccountController } from '@/application/controllers'
import { DeleteAccount } from '@/application/usecases'
import { AccountFsRepository } from '@/infra/repository'

export const makeDeleteAccountController = () => {
  const accountFsRepository = new AccountFsRepository()

  const updateAccount = new DeleteAccount(accountFsRepository)

  return new DeleteAccountController(updateAccount)
}