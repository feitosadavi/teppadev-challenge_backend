import {
  ISignup,
  ICreateAccountRepository,
  ICreateRestaurantRepository
} from '@/application/protocols'

export class Signup implements ISignup {
  constructor(
    private readonly createAccountRepository: ICreateAccountRepository,
    private readonly createRestaurantRepository: ICreateRestaurantRepository
  ) { }

  async execute (input: ISignup.Input): Promise<ISignup.Output> {
    const { accountInput, restaurantInput } = input
    Promise.all([
      this.createAccountRepository.create(accountInput),
      this.createRestaurantRepository.create(restaurantInput)
    ])
    return
  }
}