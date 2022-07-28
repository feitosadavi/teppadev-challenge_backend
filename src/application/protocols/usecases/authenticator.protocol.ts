export interface IAuthenticator {
  authenticate (input: IAuthenticator.Input): Promise<IAuthenticator.Output>
}

export namespace IAuthenticator {
  export type Input = {
    email: string
    password: string
  }
  export type Output = {
    accessToken: string
  }
}