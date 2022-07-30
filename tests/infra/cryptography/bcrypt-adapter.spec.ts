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

    beforeAll(() => {
      salt = 12

      fakeBcrypt.hash.mockImplementation(() => 'any_hash')
    })

    it('should call hash with correct params', async () => {
      let input = 'any_input'
      await sut.hash(input)

      expect(fakeBcrypt.hash).toHaveBeenCalledWith(input, salt)
    })
  })
})