import { Restaurant } from '@/domain/entities'

export interface ICreateRestaurantRepository {
  create (input: ICreateRestaurantRepository.Input): Promise<ICreateRestaurantRepository.Output>
}

export namespace ICreateRestaurantRepository {
  export type Input = Omit<Restaurant, 'id'>
  export type Output = void
}

export interface IUpdateRestaurantRepository {
  update (input: IUpdateRestaurantRepository.Input): Promise<IUpdateRestaurantRepository.Output>
}

export namespace IUpdateRestaurantRepository {
  export type Input = {
    restaurantId: string
    data: Partial<Omit<Restaurant, 'id'>>
  }
  export type Output = void
}