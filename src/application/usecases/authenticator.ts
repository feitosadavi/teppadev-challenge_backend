import {
  IAuthenticator,
  IHashComparer,
  TokenGenerator,
  IUpdateAccountRepository
} from '@/application/protocols'

export class Authenticator implements IAuthenticator {
  constructor(
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccountRepository: IUpdateAccountRepository,
  ) { }

  async execute ({ password, accountPassword, accountId }: IAuthenticator.Input): Promise<IAuthenticator.Output> {
    const matched = await this.hashComparer.compare({ value: password, hash: accountPassword });
    if (matched) {
      const accessToken = await this.tokenGenerator.generate({ key: accountId })
      await this.updateAccountRepository.update({ accountId, data: { accessToken } })
      return accessToken
    }
    return null
  }
}