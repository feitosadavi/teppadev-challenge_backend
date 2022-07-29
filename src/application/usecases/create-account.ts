import {
  ICreateAccount,
  ICreateAccountRepository,
  Hasher,
  IAuthenticator
} from '@/application/protocols'

export class CreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly createAccountRepository: ICreateAccountRepository,
    private readonly authentication: IAuthenticator,
  ) { }

  async execute ({ email, password }: ICreateAccount.Input): Promise<ICreateAccount.Output | null> {
    const hashedPassword = await this.hasher.hash(password);
    await this.createAccountRepository.create({ email, password: hashedPassword })
    const accessToken = await this.authentication.authenticate({ email, password })
    if (!accessToken) return null
    return { accessToken }
  }
}