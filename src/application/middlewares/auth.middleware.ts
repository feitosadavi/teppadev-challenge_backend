import { ok } from '@/application/controllers/helpers'
import { HttpResponse, ILoadAccountByToken, IMiddleware } from '@/application/protocols'
import { serverError, forbidden } from '@/application/controllers/helpers'
import { AccessDeniedError } from '@/application/controllers/errors'

export class AuthMiddleware implements IMiddleware {
  constructor(
    private readonly loadAccountByToken: ILoadAccountByToken,
  ) { }

  async handle ({ accessToken }: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      if (accessToken) {
        const account = await this.loadAccountByToken.execute({ accessToken })
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
