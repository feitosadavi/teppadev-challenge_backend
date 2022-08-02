import { LoginController } from '@/application/controllers'
import { Authenticator, LoadAccountByEmail } from '@/application/usecases'
import { BcryptAdapter, JWTAdapter } from '@/infra/cryptography'
import { AccountFsRepository } from '@/infra/repository'
import { LoginControllerValidator } from '@/infra/validation'

export const makeLoginController = () => {
  const loginControllerValidator = new LoginControllerValidator()

  const accountFsRepository = new AccountFsRepository()

  let salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JWTAdapter(process.env.JWTSECRET)

  const loadAccountByEmail = new LoadAccountByEmail(accountFsRepository)
  const authenticator = new Authenticator(bcryptAdapter, jwtAdapter, accountFsRepository)

  return new LoginController(loginControllerValidator, loadAccountByEmail, authenticator)
}