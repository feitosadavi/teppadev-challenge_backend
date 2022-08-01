import {
  IValidator,
  Controller,
  HttpResponse,
  IUpdateAccount,
} from '@/application/protocols'
import { Account } from '@/domain/entities'
import { badRequest, noContent, serverError } from './helpers/http.helper'

export class UpdateAccountController implements Controller<UpdateAccountController.Request, UpdateAccountController.Reponse> {
  constructor(
    private readonly validator: IValidator,
    private readonly updateAccount: IUpdateAccount,
  ) { }

  async handle (req: UpdateAccountController.Request): Promise<HttpResponse<UpdateAccountController.Reponse>> {
    try {
      const error = this.validator.validate(req.data)
      if (error) return badRequest(error)

      await this.updateAccount.execute(req)

      return noContent()

    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateAccountController {
  export type Request = {
    accountId: string,
    data: Partial<Omit<Account, 'id' | 'password'>>
  }
  export type Reponse = {}
}