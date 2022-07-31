import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { SignupController } from '@/application/controllers'
import { AccountFsRepository, RestaurantFsRepository } from '@/infra/repository'
import { CreateAccount, CreateRestaurant, LoadAccountByEmail } from '@/application/usecases'
import { BcryptAdapter, JWTAdapter } from '@/infra/cryptography'
import { SignupControllerValidator } from '@/infra/validation/signup-controller.validator'

const makeSignupController = () => {
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

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
