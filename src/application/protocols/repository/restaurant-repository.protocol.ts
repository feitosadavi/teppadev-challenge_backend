import { Restaurant } from '@/domain/entities'

export interface ICreateRestaurantRepository {
  create (input: ICreateRestaurantRepository.Input): Promise<ICreateRestaurantRepository.Output>
}

export namespace ICreateRestaurantRepository {
  export type Input = Omit<Restaurant, 'id'>
  export type Output = void
}

export interface ILoadRestaurantByIdRepository {
  loadById (input: ILoadRestaurantByIdRepository.Input): Promise<ILoadRestaurantByIdRepository.Output>
}

export namespace ILoadRestaurantByIdRepository {
  export type Input = { id: string }
  export type Output = Restaurant | null
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

export interface IDeleteRestaurantRepository {
  delete (input: IDeleteRestaurantRepository.Input): Promise<IDeleteRestaurantRepository.Output>
}

export namespace IDeleteRestaurantRepository {
  export type Input = {
    restaurantId: string,
  }
  export type Output = void
}

// Menu
export interface ICreateMenuRepository {
  execute (input: ICreateMenuRepository.Input): Promise<ICreateMenuRepository.Output>
}

export namespace ICreateMenuRepository {
  export type Input = Restaurant.Menu
  export type Output = void
}
