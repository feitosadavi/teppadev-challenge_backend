import { Restaurant } from '@/domain/entities'

export interface ICreateRestaurantRepository {
  create (input: ICreateRestaurantRepository.Input): Promise<ICreateRestaurantRepository.Output>
}

export namespace ICreateRestaurantRepository {
  export type Input = Omit<Restaurant, 'id'>
  export type Output = void
}