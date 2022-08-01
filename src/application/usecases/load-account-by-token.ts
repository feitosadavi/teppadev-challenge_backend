import {
  ILoadAccountByToken,
  ILoadAccountByTokenRepository,
} from '@/application/protocols'

export class LoadAccountByToken implements ILoadAccountByToken {
  constructor(
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository,
  ) { }

  async execute (input: ILoadAccountByToken.Input): Promise<ILoadAccountByToken.Output | null> {
    const account = await this.loadAccountByTokenRepository.loadByToken(input)
    return account
  }
}