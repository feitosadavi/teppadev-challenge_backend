import {
  IAuthenticator,
  IHashComparer,
  TokenGenerator
} from '@/application/protocols'

export class Authenticator implements IAuthenticator {
  constructor(
    private readonly hashComparer: IHashComparer,
    // private readonly tokenGenerator: TokenGenerator,
  ) { }

  async execute ({ password, accountPassword, accountId }: IAuthenticator.Input): Promise<IAuthenticator.Output> {
    const matched = await this.hashComparer.compare({ value: password, hash: accountPassword });
    return
    // if (matched) {
    //   const accessToken = await this.tokenGenerator.generate({ key: accountId })
    //   return accessToken
    // }
  }
}