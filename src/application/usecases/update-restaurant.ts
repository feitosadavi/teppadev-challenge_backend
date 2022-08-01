import {
  IUpdateRestaurant,
  IUpdateRestaurantRepository
} from '@/application/protocols'

export class UpdateRestaurant implements IUpdateRestaurant {
  constructor(
    private readonly updateRestaurantRepository: IUpdateRestaurantRepository,
  ) { }

  async execute (input: IUpdateRestaurant.Input): Promise<IUpdateRestaurant.Output> {
    await this.updateRestaurantRepository.update(input)
  }
}