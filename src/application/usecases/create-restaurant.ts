import {
  ICreateRestaurant,
  ICreateRestaurantRepository,
} from '@/application/protocols'

export class CreateRestaurant implements ICreateRestaurant {
  constructor(
    private readonly createRestaurantRepository: ICreateRestaurantRepository,
  ) { }

  async execute (input: ICreateRestaurant.Input): Promise<ICreateRestaurant.Output> {
    this.createRestaurantRepository.create(input)
    return
  }
}