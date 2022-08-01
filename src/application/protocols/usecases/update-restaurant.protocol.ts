import { Restaurant } from '@/domain/entities'

export interface IUpdateRestaurant {
  execute (input: IUpdateRestaurant.Input): Promise<IUpdateRestaurant.Output>
}

export namespace IUpdateRestaurant {
  export type Input = {
    restaurantId: string,
    data: Partial<Omit<Restaurant, 'id'>>
  }
  export type Output = void
}