import { UpdateRestaurantController } from '@/application/controllers'
import { LoadRestaurantById, UpdateRestaurant } from '@/application/usecases'
import { RestaurantFsRepository } from '@/infra/repository'
import { UpdateRestaurantControllerValidator } from '@/infra/validation'

export const makeUpdateRestaurantController = () => {
  const updateRestaurantControllerValidator = new UpdateRestaurantControllerValidator()

  const restaurantFsRepository = new RestaurantFsRepository()

  const updateRestaurant = new UpdateRestaurant(restaurantFsRepository)
  const loadRestaurantById = new LoadRestaurantById(restaurantFsRepository)

  return new UpdateRestaurantController(updateRestaurantControllerValidator, loadRestaurantById, updateRestaurant)
}
