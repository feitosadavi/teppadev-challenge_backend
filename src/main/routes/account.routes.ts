import { Router } from 'express'
import { adaptRoute, adaptMiddleware } from '@/main/adapters'
import { UpdateAccountController } from '@/application/controllers'
import { AccountFsRepository } from '@/infra/repository'
import { LoadAccountByToken, UpdateAccount } from '@/application/usecases'
import { UpdateAccountControllerValidator } from '@/infra/validation'
import { AuthMiddleware } from '@/application/middlewares'

const makeAuthMiddleware = () => {
  const accountFsRepository = new AccountFsRepository()

  const loadAccountByToken = new LoadAccountByToken(accountFsRepository)

  return new AuthMiddleware(loadAccountByToken)
}

const makeUpdateAccountController = () => {
  const updateAccountControllerValidator = new UpdateAccountControllerValidator()

  const accountFsRepository = new AccountFsRepository()

  const updateAccount = new UpdateAccount(accountFsRepository)

  return new UpdateAccountController(updateAccountControllerValidator, updateAccount)
}



export default (router: Router): void => {
  router.put('/accounts/update', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateAccountController()))
}
