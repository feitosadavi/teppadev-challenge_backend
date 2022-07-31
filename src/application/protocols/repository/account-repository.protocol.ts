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