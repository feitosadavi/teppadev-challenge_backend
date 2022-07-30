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

    it('should rethrow if sign throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })

      const promise = sut.generate({ key })

      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })

  describe('validate', () => {
    let token: string
    let key: string

    beforeAll(() => {
      token = 'any_token'
      key = 'any_key'

      fakeJwt.verify.mockImplementation(() => ({ key }))
    })

    it('should call sign with correct params', async () => {
      await sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
    })

    it('should return a key on success', async () => {
      const returnedKey = await sut.validate({ token })

      expect(returnedKey).toBe(key)
    })

    it('should rethrow if verify returns null', async () => {
      fakeJwt.verify.mockImplementationOnce(() => null)

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow()
    })
  })
})