import jwt, { sign } from 'jsonwebtoken'

import { TokenGenerator } from '@/application/protocols';


export class JWTAdapter implements TokenGenerator {
  constructor(private readonly secret: string) { }

  async generate (input: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const token = jwt.sign(input, this.secret)
    return token
  }
}