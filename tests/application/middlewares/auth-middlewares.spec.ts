import { MockProxy, mock } from 'jest-mock-extended'

import { Account } from '@/domain/entities'
import {
  ILoadAccountByToken,
} from '@/application/protocols'
import { AuthMiddleware } from '@/application/middlewares'
import { forbidden, ok } from '@/application/helpers'
import { AccessDeniedError } from '@/application/errors'


const makeFakeRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_access_token'
})

const makeFakeAccount = (): Account => ({
  id: 'any_id',
  email: 'any_email',
  password: 'hashed_password'
})

describe('AuthMiddleware', () => {
  let sut: AuthMiddleware

  let fakeLoadAccountByToken: MockProxy<ILoadAccountByToken>

  let fakeRequest: AuthMiddleware.Request

  beforeAll(() => {

    fakeLoadAccountByToken = mock()
    fakeLoadAccountByToken.execute.mockResolvedValue(makeFakeAccount())

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new AuthMiddleware(fakeLoadAccountByToken)
  })

  it('should return 403 if request has no accessToken', async () => {
    const response = await sut.handle({})

    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should call validator with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeLoadAccountByToken.execute)
      .toHaveBeenCalledWith(fakeRequest)
  })

  it('should return 403 if request has no accessToken', async () => {
    fakeLoadAccountByToken.execute.mockReturnValueOnce(null)
    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should return 403 if request has no accessToken', async () => {
    const response = await sut.handle(fakeRequest)
    const { id: accountId } = makeFakeAccount()
    expect(response).toEqual(ok({ accountId }))
  })
})