export interface Hasher {
  hash (value: string): Promise<string>
}

export interface IHashComparer {
  compare (input: IHashComparer.Input): Promise<IHashComparer.Output>
}

export namespace IHashComparer {
  export type Input = {
    value: string
    hash: string
  }

  export type Output = boolean
}