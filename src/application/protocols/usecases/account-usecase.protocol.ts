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

export interface ILoadAccountByToken {
  execute (input: ILoadAccountByToken.Input): Promise<ILoadAccountByToken.Output>
}

export namespace ILoadAccountByToken {
  export type Input = { accessToken: string }
  export type Output = Account | null
}

export interface ILoadAccountByEmail {
  execute (input: ILoadAccountByEmail.Input): Promise<ILoadAccountByEmail.Output>
}

export namespace ILoadAccountByEmail {
  export type Input = { email: string }
  export type Output = Account | null
}


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

export interface IDeleteAccount {
  execute (input: IDeleteAccount.Input): Promise<IDeleteAccount.Output>
}

export namespace IDeleteAccount {
  export type Input = {
    accountId: string,
  }
  export type Output = void
}