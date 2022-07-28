import { Restaurant } from '@/domain/entities'

export interface ICreateRestaurant {
  execute (input: ICreateRestaurant.Input): Promise<ICreateRestaurant.Output>
}

export namespace ICreateRestaurant {
  export type Input = Omit<Restaurant, 'id'>
  export type Output = void
}