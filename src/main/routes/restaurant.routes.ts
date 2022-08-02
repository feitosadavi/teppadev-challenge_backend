import { Router } from 'express'
import { adaptRoute, adaptMiddleware } from '@/main/adapters'
import { makeAuthMiddleware, makeUpdateRestaurantController } from '@/main/factories'

export default (router: Router): void => {
  router.put('/restaurants/:restaurantId/update', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateRestaurantController()))
}
