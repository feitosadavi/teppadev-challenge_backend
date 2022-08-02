import {
  IValidator,
  Controller,
  HttpResponse,
  ILoadAccountByEmail,
  IAuthenticator
} from '@/application/protocols'
import { EmailNotFound, IncorrectPasswordError } from '@/application/errors'
import { badRequest, ok, serverError } from '@/application/helpers'

export class LoginController implements Controller<LoginController.Request, LoginController.Reponse> {
  constructor(
    private readonly validator: IValidator,
    private readonly loadAccountByEmail: ILoadAccountByEmail,
    private readonly authenticator: IAuthenticator,

  ) { }

  async handle (req: LoginController.Request): Promise<HttpResponse<LoginController.Reponse>> {
    try {
      const error = this.validator.validate(req)
      if (error) return badRequest(error)

      const { email, password } = req

      const account = await this.loadAccountByEmail.execute({ email })
      if (!account) return badRequest(new EmailNotFound())

      const { id: accountId, password: accountPassword } = account
      const accessToken = await this.authenticator.execute({ password, accountPassword, accountId })
      if (!accessToken) return badRequest(new IncorrectPasswordError())

      return ok({ accessToken, id: accountId })

    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
  export type Reponse = {
    id: string
    accessToken: string
  } | string
}