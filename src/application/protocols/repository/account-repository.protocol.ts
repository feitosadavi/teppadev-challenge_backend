import { Account } from '@/domain/entities'

export interface ICreateAccountRepository {
  create (input: ICreateAccountRepository.Input): Promise<ICreateAccountRepository.Output>
}

export namespace ICreateAccountRepository {
  export type Input = Omit<Account, 'id'>
  export type Output = void
}