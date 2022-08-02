import { Router } from 'express'
import { adaptRoute, adaptMiddleware } from '@/main/adapters'
import { makeAuthMiddleware, makeUpdateRestaurantController, makeDeleteRestaurantController } from '@/main/factories'

export default (router: Router): void => {
  router.put('/restaurants/:restaurantId/update', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateRestaurantController()))
  router.delete('/restaurants/:restaurantId/delete', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteRestaurantController()))
}
