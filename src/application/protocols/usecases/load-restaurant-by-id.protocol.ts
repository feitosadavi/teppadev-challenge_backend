import { Restaurant } from '@/domain/entities'

export interface ILoadRestaurantById {
  execute (input: ILoadRestaurantById.Input): Promise<ILoadRestaurantById.Output>
}

export namespace ILoadRestaurantById {
  export type Input = { id: string }
  export type Output = Restaurant | null
}