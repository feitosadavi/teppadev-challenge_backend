import { Router } from 'express'
import { adaptRoute, adaptMiddleware } from '@/main/adapters'
import { UpdateRestaurantController } from '@/application/controllers'
import { AccountFsRepository, RestaurantFsRepository } from '@/infra/repository'
import { LoadAccountByToken, LoadRestaurantById, UpdateRestaurant } from '@/application/usecases'
import { UpdateRestaurantControllerValidator } from '@/infra/validation'
import { AuthMiddleware } from '@/application/middlewares'

const makeAuthMiddleware = () => {
  const accountFsRepository = new AccountFsRepository()

  const loadRestaurantByToken = new LoadAccountByToken(accountFsRepository)

  return new AuthMiddleware(loadRestaurantByToken)
}

const makeUpdateRestaurantController = () => {
  const updateRestaurantControllerValidator = new UpdateRestaurantControllerValidator()

  const restaurantFsRepository = new RestaurantFsRepository()

  const updateRestaurant = new UpdateRestaurant(restaurantFsRepository)
  const loadRestaurantById = new LoadRestaurantById(restaurantFsRepository)

  return new UpdateRestaurantController(updateRestaurantControllerValidator, loadRestaurantById, updateRestaurant)
}



export default (router: Router): void => {
  router.put('/restaurants/:restaurantId/update', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateRestaurantController()))
}
