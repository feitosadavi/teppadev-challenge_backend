import { MockProxy, mock } from 'jest-mock-extended'

import { Account } from '@/domain/entities'
import {
  IValidator,
  ILoadAccountByEmail,
  IAuthenticator
} from '@/application/protocols'
import { LoginController } from '@/application/controllers'
import { EmailNotFound } from '@/application/controllers/errors'
import { badRequest, serverError } from '@/application/controllers/helpers'

const makeFakeRequest = (): LoginController.Request => ({
  email: 'any@email.com',
  password: 'any_password'
})

const makeFakeAccount = (): Account => ({
  id: 'any_id',
  email: 'any_email',
  password: 'hashed_password'
})

const makeFakeAuthenticatorResult = (): IAuthenticator.Output => 'any_access_token'

describe('LoginController', () => {
  let sut: LoginController

  let fakeValidator: MockProxy<IValidator>
  let fakeLoadAccountByEmail: MockProxy<ILoadAccountByEmail>
  let fakeAuthenticator: MockProxy<IAuthenticator>

  let fakeRequest: LoginController.Request

  beforeAll(() => {
    fakeValidator = mock()

    fakeLoadAccountByEmail = mock()
    fakeLoadAccountByEmail.execute.mockResolvedValue(makeFakeAccount())

    fakeAuthenticator = mock()
    fakeAuthenticator.authenticate.mockResolvedValue(makeFakeAuthenticatorResult())

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new LoginController(
      fakeValidator,
      fakeLoadAccountByEmail,
      fakeAuthenticator
    )
  })

  it('should call validator with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeValidator.validate)
      .toHaveBeenCalledWith(fakeRequest)
  })

  it('should return 400 if loadAccountByEmail returns null', async () => {
    fakeLoadAccountByEmail.execute.mockReturnValueOnce(null)
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(badRequest(new EmailNotFound()))
  })

  it('should call authenticator with correct input', async () => {
    await sut.handle(fakeRequest)
    const { email, password } = fakeRequest
    const { id: accountId, password: accountPassword } = makeFakeAccount()
    expect(fakeAuthenticator.authenticate)
      .toHaveBeenCalledWith({ email, password, accountId, accountPassword })
  })

  it('should return 500 on error', async () => {
    fakeLoadAccountByEmail.execute.mockRejectedValueOnce(new Error())
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(serverError(new Error()))
  })
})