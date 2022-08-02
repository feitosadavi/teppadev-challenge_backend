import {
  Controller,
  HttpResponse,
  IDeleteRestaurant,
  ILoadRestaurantById,
} from '@/application/protocols'
import { noContent, serverError } from '@/application/helpers'

export class DeleteRestaurantController implements Controller<DeleteRestaurantController.Request, DeleteRestaurantController.Reponse> {
  constructor(
    private readonly loadRestaurantById: ILoadRestaurantById,
    private readonly deleteRestaurant: IDeleteRestaurant,
  ) { }

  async handle (req: DeleteRestaurantController.Request): Promise<HttpResponse<DeleteRestaurantController.Reponse>> {
    try {
      const { accountId, restaurantId } = req
      await this.loadRestaurantById.execute({ id: restaurantId })
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