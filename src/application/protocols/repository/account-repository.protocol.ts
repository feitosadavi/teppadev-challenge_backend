import { Account } from '@/domain/entities'

export interface ICreateAccountRepository {
  create (input: ICreateAccountRepository.Input): Promise<ICreateAccountRepository.Output>
}

export namespace ICreateAccountRepository {
  export type Input = Omit<Account, 'id'>
  export type Output = string // id
}

export interface ILoadAccountByEmailRepository {
  loadByEmail (input: ILoadAccountByEmailRepository.Input): Promise<ILoadAccountByEmailRepository.Output>
}

export namespace ILoadAccountByEmailRepository {
  export type Input = { email: string }
  export type Output = Account | null
}

export interface ILoadAccountByTokenRepository {
  loadByToken (input: ILoadAccountByTokenRepository.Input): Promise<ILoadAccountByTokenRepository.Output>
}

export namespace ILoadAccountByTokenRepository {
  export type Input = { accessToken: string }
  export type Output = Account | null
}

export interface IUpdateAccountRepository {
  update (input: IUpdateAccountRepository.Input): Promise<IUpdateAccountRepository.Output>
}

export namespace IUpdateAccountRepository {
  export type Input = {
    accountId: string
    data: Partial<Omit<Account, 'id' | 'password'>>
  }
  export type Output = void
}

export interface IDeleteAccountRepository {
  delete (input: IDeleteAccountRepository.Input): Promise<IDeleteAccountRepository.Output>
}

export namespace IDeleteAccountRepository {
  export type Input = {
    accountId: string,
  }
  export type Output = void
}