import { JWTAdapter } from '@/infra/cryptography'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')
describe('JWTAdapter', () => {
  let sut: JWTAdapter
  let fakeJwt = jwt as jest.Mocked<typeof jwt>

  let secret: string

  beforeAll(() => {
    secret = 'secret'
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    sut = new JWTAdapter(secret)
  })

  describe('generate', () => {
    let token: string
    let key: string

    beforeAll(() => {
      token = 'any_token'
      key = 'any_key'

      fakeJwt.sign.mockImplementation(() => token)
    })

    it('should call sign with correct params', async () => {
      await sut.generate({ key })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret)
    })

    it('should return a token on success', async () => {
      const generatedToken = await sut.generate({ key })

      expect(generatedToken).toBe(token)
    })
  })

})