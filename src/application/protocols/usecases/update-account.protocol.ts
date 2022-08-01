import { Account } from '@/domain/entities'

export interface IUpdateAccount {
  execute (input: IUpdateAccount.Input): Promise<IUpdateAccount.Output>
}

export namespace IUpdateAccount {
  export type Input = {
    accountId: string,
    data: Partial<Omit<Account, 'id' | 'password'>>
  }
  export type Output = void
}