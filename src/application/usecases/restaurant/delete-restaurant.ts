import {
  IDeleteRestaurant,
  IDeleteRestaurantRepository
} from '@/application/protocols'

export class DeleteRestaurant implements IDeleteRestaurant {
  constructor(
    private readonly deleteRestaurantRepository: IDeleteRestaurantRepository,
  ) { }

  async execute (input: IDeleteRestaurant.Input): Promise<IDeleteRestaurant.Output> {
    await this.deleteRestaurantRepository.delete(input)
  }
}