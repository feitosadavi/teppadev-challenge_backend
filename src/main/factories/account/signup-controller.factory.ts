import { BcryptAdapter, JWTAdapter } from '@/infra/cryptography'
import { AccountFsRepository, RestaurantFsRepository } from '@/infra/repository'
import { SignupControllerValidator } from '@/infra/validation'
import { SignupController } from '@/application/controllers'
import { CreateAccount, CreateRestaurant, LoadAccountByEmail } from '@/application/usecases'

export const makeSignupController = () => {
  const signupControllerValidator = new SignupControllerValidator()

  const accountFsRepository = new AccountFsRepository()
  const restaurantFsRepository = new RestaurantFsRepository()

  let salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const tokenGenerator = new JWTAdapter(process.env.JWTSECRET)

  const loadAccountByEmail = new LoadAccountByEmail(accountFsRepository)
  const createAccount = new CreateAccount(bcryptAdapter, accountFsRepository, tokenGenerator)
  const createRestaurant = new CreateRestaurant(restaurantFsRepository)

  return new SignupController(signupControllerValidator, loadAccountByEmail, createAccount, createRestaurant)
}