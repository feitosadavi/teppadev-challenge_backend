import { sign, verify, JwtPayload } from 'jsonwebtoken'

import { TokenGenerator, TokenValidator } from '@/application/protocols';


export class JWTAdapter implements TokenGenerator, TokenValidator {
  constructor(private readonly secret: string) { }

  async generate (input: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const token = sign(input, this.secret)
    return token
  }

  async validate ({ token }: TokenValidator.Input): Promise<TokenValidator.Output> {
    const payload = verify(token, this.secret) as JwtPayload
    return
  }
}