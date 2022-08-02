import {
  IValidator,
  Controller,
  HttpResponse,
  ILoadRestaurantById,
  IUpdateRestaurant,
} from '@/application/protocols'
import { RestaurantDoesntBelongsToAccountError } from '@/application/errors'
import { badRequest, noContent, serverError, forbidden } from '@/application/helpers'

export class UpdateRestaurantController implements Controller<UpdateRestaurantController.Request, UpdateRestaurantController.Reponse> {
  constructor(
    private readonly validator: IValidator,
    private readonly loadRestaurantById: ILoadRestaurantById,
    private readonly updateRestaurant: IUpdateRestaurant,
  ) { }

  async handle (req: UpdateRestaurantController.Request): Promise<HttpResponse<UpdateRestaurantController.Reponse>> {
    try {
      const { restaurantId, accountId, ...data } = req
      const error = this.validator.validate(data)
      if (error) return badRequest(error)

      const restaurant = await this.loadRestaurantById.execute({ id: restaurantId })

      if (accountId !== restaurant.accountId) return forbidden(new RestaurantDoesntBelongsToAccountError())

      await this.updateRestaurant.execute({ restaurantId, ...data })

      return noContent()

    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateRestaurantController {
  export type Request = {
    restaurantId: string,
    accountId: string,
    data: IUpdateRestaurant.Data
  }
  export type Reponse = {}
}