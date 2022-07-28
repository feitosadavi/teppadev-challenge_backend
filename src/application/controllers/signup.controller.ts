import {
  Controller,
  HttpResponse,
  ICreateAccount,
  ICreateRestaurant
} from '@/application/protocols'

export class SignupController implements Controller<SignupController.Request, SignupController.Reponse> {
  constructor(
    private readonly createAccount: ICreateAccount,
    private readonly createRestaurant: ICreateRestaurant
  ) { }

  async handle ({ accountInput, restaurantInput }: SignupController.Request): Promise<HttpResponse<SignupController.Reponse>> {
    const accessToken = await this.createAccount.execute(accountInput)
    if (!accessToken) return { statusCode: 400, body: 'O email inserido já está em uso' }
    // await this.createRestaurant.execute(restaurantInput)
    return
  }
}

export namespace SignupController {
  type Data = {
    accountInput: ICreateAccount.Input
    restaurantInput: ICreateRestaurant.Input
  }
  export type Request = Data
  export type Reponse = {
    accessToken: string
  } | string
}