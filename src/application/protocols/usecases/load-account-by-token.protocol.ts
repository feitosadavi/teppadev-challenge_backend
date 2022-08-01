import { Account } from '@/domain/entities'

export interface ILoadAccountByToken {
  execute (input: ILoadAccountByToken.Input): Promise<ILoadAccountByToken.Output>
}

export namespace ILoadAccountByToken {
  export type Input = { accessToken: string }
  export type Output = Account | null
}