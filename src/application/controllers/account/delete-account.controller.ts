import {
  Controller,
  HttpResponse,
  IDeleteAccount,
} from '@/application/protocols'
import { noContent, serverError } from '@/application/helpers'

export class DeleteAccountController implements Controller<DeleteAccountController.Request, DeleteAccountController.Reponse> {
  constructor(
    private readonly deleteAccount: IDeleteAccount,
  ) { }

  async handle (req: DeleteAccountController.Request): Promise<HttpResponse<DeleteAccountController.Reponse>> {
    try {

      await this.deleteAccount.execute(req)
      return noContent()

    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteAccountController {
  export type Request = {
    accountId: string,
  }
  export type Reponse = {}
}