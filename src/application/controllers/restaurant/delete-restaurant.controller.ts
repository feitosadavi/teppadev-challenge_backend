import {
  Controller,
  HttpResponse,
  IDeleteRestaurant,
  ILoadRestaurantById,
} from '@/application/protocols'
import { forbidden, noContent, serverError } from '@/application/helpers'
import { RestaurantDoesntBelongsToAccountError } from '@/application/errors'

export class DeleteRestaurantController implements Controller<DeleteRestaurantController.Request, DeleteRestaurantController.Reponse> {
  constructor(
    private readonly loadRestaurantById: ILoadRestaurantById,
    private readonly deleteRestaurant: IDeleteRestaurant,
  ) { }

  async handle (req: DeleteRestaurantController.Request): Promise<HttpResponse<DeleteRestaurantController.Reponse>> {
    try {
      const { accountId, restaurantId } = req
      const restaurant = await this.loadRestaurantById.execute({ id: restaurantId })
      if (restaurant.accountId !== accountId) return forbidden(new RestaurantDoesntBelongsToAccountError())
      await this.deleteRestaurant.execute({ restaurantId })
      return noContent()

    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteRestaurantController {
  export type Request = {
    accountId: string,
    restaurantId: string,
  }
  export type Reponse = {}
}