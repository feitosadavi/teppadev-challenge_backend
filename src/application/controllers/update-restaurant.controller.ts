import {
  IValidator,
  Controller,
  HttpResponse,
  IUpdateRestaurant,
} from '@/application/protocols'
import { Restaurant } from '@/domain/entities'
import { badRequest, noContent, serverError } from './helpers/http.helper'

export class UpdateRestaurantController implements Controller<UpdateRestaurantController.Request, UpdateRestaurantController.Reponse> {
  constructor(
    private readonly validator: IValidator,
    private readonly updateRestaurant: IUpdateRestaurant,
  ) { }

  async handle (req: UpdateRestaurantController.Request): Promise<HttpResponse<UpdateRestaurantController.Reponse>> {
    try {
      const { restaurantId, ...fieldsToValidate } = req
      const error = this.validator.validate(fieldsToValidate)
      if (error) return badRequest(error)

      await this.updateRestaurant.execute(req)

      return noContent()

    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateRestaurantController {
  export type Request = {
    restaurantId: string,
    data: Partial<Omit<Restaurant, 'id' | 'password'>>
  }
  export type Reponse = {}
}