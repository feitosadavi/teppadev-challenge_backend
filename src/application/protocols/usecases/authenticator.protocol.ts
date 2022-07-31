export interface IAuthenticator {
  execute (input: IAuthenticator.Input): Promise<IAuthenticator.Output>
}

export namespace IAuthenticator {
  export type Input = {
    password: string
    accountPassword: string
    accountId: string
  }
  export type Output = string | null // accessToken
}