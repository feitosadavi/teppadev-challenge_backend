import { sign } from 'jsonwebtoken'

import { TokenGenerator } from '@/application/protocols';


export class JWTAdapter implements TokenGenerator {
  constructor(private readonly secret: string) { }

  async generate (input: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    sign(input, this.secret)
    return
  }
}