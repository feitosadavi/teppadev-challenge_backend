import {
  Controller,
  HttpResponse,
  IDeleteRestaurant,
} from '@/application/protocols'
import { noContent, serverError } from '@/application/helpers'

export class DeleteRestaurantController implements Controller<DeleteRestaurantController.Request, DeleteRestaurantController.Reponse> {
  constructor(
    private readonly deleteRestaurant: IDeleteRestaurant,
  ) { }

  async handle (req: DeleteRestaurantController.Request): Promise<HttpResponse<DeleteRestaurantController.Reponse>> {
    try {

      await this.deleteRestaurant.execute(req)
      return noContent()

    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteRestaurantController {
  export type Request = {
    restaurantId: string,
  }
  export type Reponse = {}
}