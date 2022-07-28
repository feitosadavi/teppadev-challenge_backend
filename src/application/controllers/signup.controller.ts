import {
  Controller,
  HttpResponse,
  ICreateAccount,
  ICreateRestaurant
} from '@/application/protocols'

export class SignupController implements Controller<SignupController.Request, SignupController.Reponse> {
  constructor(
    private readonly createAccount: ICreateAccount
  ) { }

  handle ({ accountInput }: SignupController.Request): Promise<HttpResponse<SignupController.Reponse>> {
    this.createAccount.execute(accountInput)
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
  }
}