import {
  ILoadRestaurantById,
  ILoadRestaurantByIdRepository,
} from '@/application/protocols'

export class LoadRestaurantById implements ILoadRestaurantById {
  constructor(
    private readonly loadRestaurantByIdRepository: ILoadRestaurantByIdRepository,
  ) { }

  async execute (input: ILoadRestaurantById.Input): Promise<ILoadRestaurantById.Output | null> {
    const restaurant = await this.loadRestaurantByIdRepository.loadById(input)
    return restaurant
  }
}