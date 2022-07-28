import { Account, Restaurant } from '@/domain/entities'

export interface ISignup {
  execute (input: ISignup.Input): Promise<ISignup.Output>
}

export namespace ISignup {
  type AccountProps = Omit<Account, 'id'>
  type RestarauntProps = Omit<Restaurant, 'id'>
  export type Input = {
    accountInput: AccountProps,
    restaurantInput: RestarauntProps
  }

  export type Output = {
    accessToken: string
  }
}