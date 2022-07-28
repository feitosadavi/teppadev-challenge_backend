import {
  ICreateAccount,
  ILoadAccountByEmailRepository,
  ICreateAccountRepository,
  Hasher
} from '@/application/protocols'

export class CreateAccount implements ICreateAccount {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly createAccountRepository: ICreateAccountRepository,
  ) { }

  async execute ({ email, password }: ICreateAccount.Input): Promise<ICreateAccount.Output | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail({ email })
    if (account) return null
    const hashedPassword = await this.hasher.hash(password);
    await this.createAccountRepository.create({ email, password: hashedPassword })
  }
}