import { Restaurant } from '@/domain/entities'

export interface ICreateRestaurant {
  execute (input: ICreateRestaurant.Input): Promise<ICreateRestaurant.Output>
}

export namespace ICreateRestaurant {
  export type Input = Omit<Restaurant, 'id'> & { accountId: string }
  export type Output = void
}

export interface ILoadRestaurantById {
  execute (input: ILoadRestaurantById.Input): Promise<ILoadRestaurantById.Output>
}

export namespace ILoadRestaurantById {
  export type Input = { id: string }
  export type Output = Restaurant | null
}

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

export interface IDeleteRestaurant {
  execute (input: IDeleteRestaurant.Input): Promise<IDeleteRestaurant.Output>
}

export namespace IDeleteRestaurant {
  export type Input = {
    restaurantId: string,
  }
  export type Output = void
}