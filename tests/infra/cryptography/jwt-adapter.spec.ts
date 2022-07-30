import { JWTAdapter } from '@/infra/cryptography'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')
describe('JWTAdapter', () => {
  let sut: JWTAdapter
  let fakeJwt = jwt as jest.Mocked<typeof jwt>
  const SECRET = 'secret'
  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    sut = new JWTAdapter(SECRET)
  })

  describe('generate', () => {
    const makeFakeGenerateInput = () => ({ key: 'any_id' })

    it('should call sign with correct params', async () => {
      const fakeGenerateInput = makeFakeGenerateInput()
      await sut.generate(fakeGenerateInput)
      expect(fakeJwt.sign).toHaveBeenCalledWith(fakeGenerateInput, SECRET)
    })
  })

})