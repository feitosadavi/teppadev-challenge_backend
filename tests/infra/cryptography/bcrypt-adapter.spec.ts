import { BcryptAdapter } from '@/infra/cryptography'

import bcrypt from 'bcrypt'

jest.mock('bcrypt')
describe('BcryptAdapter', () => {
  let sut: BcryptAdapter
  let fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

  let secret: string

  beforeAll(() => {
    secret = 'secret'
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
  })

  beforeEach(() => {
    sut = new BcryptAdapter(12)
  })

  describe('hash', () => {
    let salt: number
    let input: string

    beforeAll(() => {
      salt = 12
      input = 'any_input'

      fakeBcrypt.hash.mockImplementation(() => 'any_hash')
    })

    it('should call hash with correct params', async () => {
      await sut.hash(input)

      expect(fakeBcrypt.hash).toHaveBeenCalledWith(input, salt)
    })

    it('should return a hash on success', async () => {
      const hashedInput = await sut.hash(input)

      expect(hashedInput).toBe('any_hash')
    })
  })
})