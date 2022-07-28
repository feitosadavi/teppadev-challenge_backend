import {
  ICreateAccount,
  ICreateAccountRepository,
} from '@/application/protocols'

export class CreateAccount implements ICreateAccount {
  constructor(
    private readonly createAccountRepository: ICreateAccountRepository,
  ) { }

  async execute (input: ICreateAccount.Input): Promise<ICreateAccount.Output> {
    this.createAccountRepository.create(input)
    return
  }
}