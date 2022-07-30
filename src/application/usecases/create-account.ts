import {
  ICreateAccount,
  ICreateAccountRepository,
  Hasher,
  TokenGenerator
} from '@/application/protocols'

export class CreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly createAccountRepository: ICreateAccountRepository,
    private readonly tokenGenerator: TokenGenerator,
  ) { }

  async execute ({ email, password }: ICreateAccount.Input): Promise<ICreateAccount.Output | null> {
    const hashedPassword = await this.hasher.hash(password);
    const id = await this.createAccountRepository.create({ email, password: hashedPassword })
    const accessToken = await this.tokenGenerator.generate({ key: id })
    if (!accessToken) return null
    return { accessToken }
  }
}