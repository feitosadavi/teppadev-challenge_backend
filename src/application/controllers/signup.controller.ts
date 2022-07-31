import {
  Controller,
  HttpResponse,
  ILoadAccountByEmail,
  ICreateAccount,
  ICreateRestaurant
} from '@/application/protocols'
import { EmailInUseError } from './errors'
import { badRequest, ok, serverError } from './helpers/http.helper'

export class SignupController implements Controller<SignupController.Request, SignupController.Reponse> {
  constructor(
    private readonly loadAccountByEmail: ILoadAccountByEmail,
    private readonly createAccount: ICreateAccount,
    private readonly createRestaurant: ICreateRestaurant
  ) { }

  async handle ({ accountInput, restaurantInput }: SignupController.Request): Promise<HttpResponse<SignupController.Reponse>> {
    try {
      const account = await this.loadAccountByEmail.execute({ email: accountInput.email })
      if (account) return badRequest(new EmailInUseError())

      const accessToken = await this.createAccount.execute(accountInput)

      await this.createRestaurant.execute(restaurantInput)

      return ok(accessToken)

    } catch (error) {
      return serverError(error)
    }
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