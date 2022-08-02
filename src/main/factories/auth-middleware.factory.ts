import { AuthMiddleware } from '@/application/middlewares'
import { LoadAccountByToken } from '@/application/usecases'
import { AccountFsRepository } from '@/infra/repository'

export const makeAuthMiddleware = () => {
  const accountFsRepository = new AccountFsRepository()

  const loadAccountByToken = new LoadAccountByToken(accountFsRepository)

  return new AuthMiddleware(loadAccountByToken)
}