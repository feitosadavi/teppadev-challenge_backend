import { Account } from '@/domain/entities'

export interface ILoadAccountByEmail {
  execute (input: ILoadAccountByEmail.Input): Promise<ILoadAccountByEmail.Output>
}

export namespace ILoadAccountByEmail {
  export type Input = { email: string }
  export type Output = Account | null
}