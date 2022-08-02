import {
  IUpdateAccount,
  IUpdateAccountRepository
} from '@/application/protocols'

export class UpdateAccount implements IUpdateAccount {
  constructor(
    private readonly updateAccountRepository: IUpdateAccountRepository,
  ) { }

  async execute (input: IUpdateAccount.Input): Promise<IUpdateAccount.Output> {
    await this.updateAccountRepository.update(input)
  }
}