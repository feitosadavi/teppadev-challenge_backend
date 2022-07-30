import bcrypt from 'bcrypt'
import { Hasher } from '@/application/protocols'

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) { }

  async hash (input: string): Promise<string> {
    const hash = await bcrypt.hash(input, this.salt)
    return
  }
}
