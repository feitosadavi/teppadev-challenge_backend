import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { UpdateAccountController } from '@/application/controllers'
import { AccountFsRepository } from '@/infra/repository'
import { UpdateAccount } from '@/application/usecases'
import { UpdateAccountControllerValidator } from '@/infra/validation'

const makeUpdateAccountController = () => {
  const updateAccountControllerValidator = new UpdateAccountControllerValidator()

  const accountFsRepository = new AccountFsRepository()

  const updateAccount = new UpdateAccount(accountFsRepository)

  return new UpdateAccountController(updateAccountControllerValidator, updateAccount)
}

export default (router: Router): void => {
  router.put('/accounts/update', adaptRoute(makeUpdateAccountController()))
}
