import { Account } from '@/domain/entities'

export interface ICreateAccount {
  execute (input: ICreateAccount.Input): Promise<ICreateAccount.Output>
}

export namespace ICreateAccount {
  export type Input = Omit<Account, 'id'>
  export type Output = {
    accessToken: string
    id: string
  }
}