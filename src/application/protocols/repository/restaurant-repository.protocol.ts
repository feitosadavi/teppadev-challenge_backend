import { Restaurant } from '@/domain/entities'

export interface ICreateRestaurantRepository {
  create (input: ICreateRestaurantRepository.Input): Promise<ICreateRestaurantRepository.Output>
}

export namespace ICreateRestaurantRepository {
  export type Input = Omit<Restaurant, 'id'>
  export type Output = void
}

export interface IUpdatedRestaurantRepository {
  update (input: IUpdatedRestaurantRepository.Input): Promise<IUpdatedRestaurantRepository.Output>
}

export namespace IUpdatedRestaurantRepository {
  export type Input = {
    accountId: string
    data: Partial<Omit<Restaurant, 'id'>>
  }
  export type Output = void
}