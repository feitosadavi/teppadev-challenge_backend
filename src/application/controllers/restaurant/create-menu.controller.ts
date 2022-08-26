import {
  IValidator,
  Controller,
  HttpResponse,
  ICreateMenu,
} from '@/application/protocols'
import { badRequest, noContent, serverError } from '@/application/helpers'

export class CreateMenuController implements Controller<CreateMenuController.Request, CreateMenuController.Reponse> {
  constructor(
    private readonly validator: IValidator,
    private readonly createMenu: ICreateMenu,
  ) { }

  async handle (req: CreateMenuController.Request): Promise<HttpResponse<CreateMenuController.Reponse>> {
    try {
      const error = this.validator.validate(req)
      if (error) return badRequest(error)

      await this.createMenu.execute(req)

      return noContent()

    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateMenuController {
  export type Request = ICreateMenu.Input
  export type Reponse = {}
}