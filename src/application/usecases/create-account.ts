import {
  ICreateAccount,
  ILoadAccountByEmailRepository,
  ICreateAccountRepository,
} from '@/application/protocols'

export class CreateAccount implements ICreateAccount {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly createAccountRepository: ICreateAccountRepository,
  ) { }

  async execute ({ email, password }: ICreateAccount.Input): Promise<ICreateAccount.Output> {
    await this.loadAccountByEmailRepository.loadByEmail({ email })
    await this.createAccountRepository.create({ email, password })
    return
  }
}