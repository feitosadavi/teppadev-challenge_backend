import { Restaurant } from '@/domain/entities'

export interface IUpdateRestaurant {
  execute (input: IUpdateRestaurant.Input): Promise<IUpdateRestaurant.Output>
}

export namespace IUpdateRestaurant {
  export type Data = Partial<Omit<Restaurant, 'id' | 'password'>>
  export type Input = {
    restaurantId: string,
    data: Data
  }
  export type Output = void
}