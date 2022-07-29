import {
  ILoadAccountByEmail,
  ILoadAccountByEmailRepository,
} from '@/application/protocols'

export class LoadAccountByEmail implements ILoadAccountByEmail {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
  ) { }

  async execute ({ email }: ILoadAccountByEmail.Input): Promise<ILoadAccountByEmail.Output | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail({ email })
    return account
  }
}