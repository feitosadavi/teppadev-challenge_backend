import { Account } from '@/domain/entities'

export interface ILoadAccountByEmailRepository {
  loadByEmail (input: ILoadAccountByEmailRepository.Input): Promise<ILoadAccountByEmailRepository.Output>
}

export namespace ILoadAccountByEmailRepository {
  export type Input = { email: string }
  export type Output = Account | null
}