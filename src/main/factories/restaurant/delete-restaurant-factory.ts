import { DeleteRestaurantController } from '@/application/controllers'
import { LoadRestaurantById, DeleteRestaurant } from '@/application/usecases'
import { RestaurantFsRepository } from '@/infra/repository'

export const makeDeleteRestaurantController = () => {
  const restaurantFsRepository = new RestaurantFsRepository()

  const updateRestaurant = new DeleteRestaurant(restaurantFsRepository)
  const loadRestaurantById = new LoadRestaurantById(restaurantFsRepository)

  return new DeleteRestaurantController(loadRestaurantById, updateRestaurant)
}
