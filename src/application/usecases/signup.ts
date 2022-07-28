import { ISignup, ICreateAccountRepository } from '@/application/protocols'

export class Signup implements ISignup {
  constructor(private readonly createAccountRepository: ICreateAccountRepository) { }

  async execute (input: ISignup.Input): Promise<ISignup.Output> {
    const { accountInput } = input
    await this.createAccountRepository.create(accountInput)
    return
  }
}