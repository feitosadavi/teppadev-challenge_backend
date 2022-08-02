import { UpdateAccountController } from '@/application/controllers'
import { UpdateAccount } from '@/application/usecases'
import { AccountFsRepository } from '@/infra/repository'
import { UpdateAccountControllerValidator } from '@/infra/validation'

export const makeUpdateAccountController = () => {
  const updateAccountControllerValidator = new UpdateAccountControllerValidator()

  const accountFsRepository = new AccountFsRepository()

  const updateAccount = new UpdateAccount(accountFsRepository)

  return new UpdateAccountController(updateAccountControllerValidator, updateAccount)
}