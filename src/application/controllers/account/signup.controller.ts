import {
  IValidator,
  Controller,
  HttpResponse,
  ILoadAccountByEmail,
  ICreateAccount,
  ICreateRestaurant
} from '@/application/protocols'
import { EmailInUseError } from '@/application/errors'
import { badRequest, ok, serverError } from '@/application/helpers'

export class SignupController implements Controller<SignupController.Request, SignupController.Reponse> {
  constructor(
    private readonly validator: IValidator,
    private readonly loadAccountByEmail: ILoadAccountByEmail,
    private readonly createAccount: ICreateAccount,
    private readonly createRestaurant: ICreateRestaurant
  ) { }

  async handle ({ accountInput, restaurantInput }: SignupController.Request): Promise<HttpResponse<SignupController.Reponse>> {
    try {
      const error = this.validator.validate({ accountInput, restaurantInput })
      if (error) return badRequest(error)

      const account = await this.loadAccountByEmail.execute({ email: accountInput.email })
      if (account) return badRequest(new EmailInUseError())

      const { accessToken, id } = await this.createAccount.execute(accountInput)

      await this.createRestaurant.execute({ ...restaurantInput, accountId: id })

      return ok({ accessToken })

    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignupController {
  type Data = {
    accountInput: ICreateAccount.Input
    restaurantInput: Omit<ICreateRestaurant.Input, 'accountId'>
  }
  export type Request = Data
  export type Reponse = {
    accessToken: string
  } | string
}