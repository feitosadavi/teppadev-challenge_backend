import bcrypt from 'bcrypt'
import { Hasher, IHashComparer } from '@/application/protocols'

export class BcryptAdapter implements Hasher, IHashComparer {
  constructor(private readonly salt: number) { }

  async hash (input: string): Promise<string> {
    const hashedValue = await bcrypt.hash(input, this.salt)
    return hashedValue
  }

  async compare ({ value, hash }: IHashComparer.Input): Promise<IHashComparer.Output> {
    const matched = await bcrypt.compare(value, hash)
    return matched
  }
}
