import { MockProxy, mock } from 'jest-mock-extended'

import { Account } from '@/domain/entities'
import {
  IValidator,
  ICreateAccount,
  ICreateRestaurant,
  ILoadAccountByEmail
} from '@/application/protocols'
import { SignupController } from '@/application/controllers'
import { EmailInUseError } from '@/application/controllers/errors'
import { badRequest, ok, serverError } from '@/application/controllers/helpers'

const makeFakeRequest = (): SignupController.Request => ({
  accountInput: {
    email: 'any@email.com',
    password: 'any_password'
  },
  restaurantInput: {
    name: 'any_name',
  }
})

const makeFakeAccount = (): Account => ({
  id: 'any_id',
  email: 'any_email',
  password: 'hashed_password'
})

describe('SignupController', () => {
  let sut: SignupController

  let fakeValidator: MockProxy<IValidator>
  let fakeLoadAccountByEmail: MockProxy<ILoadAccountByEmail>
  let fakeCreateAccount: MockProxy<ICreateAccount>
  let fakeCreateRestaurant: MockProxy<ICreateRestaurant>

  let fakeRequest: SignupController.Request

  beforeAll(() => {
    fakeValidator = mock()

    fakeLoadAccountByEmail = mock()
    fakeLoadAccountByEmail.execute.mockResolvedValue(null)

    fakeCreateAccount = mock()
    fakeCreateAccount.execute.mockReturnValue(Promise.resolve({ accessToken: 'any_access_token', id: 'any_id' }))

    fakeCreateRestaurant = mock()

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new SignupController(
      fakeValidator,
      fakeLoadAccountByEmail,
      fakeCreateAccount,
      fakeCreateRestaurant
    )
  })

  it('should call validator with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeValidator.validate)
      .toHaveBeenCalledWith(fakeRequest)
  })

  it('should call createAccount with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeCreateAccount.execute)
      .toHaveBeenCalledWith(fakeRequest.accountInput)
  })

  it('should return 400 if loadAccountByEmail returns null', async () => {
    fakeLoadAccountByEmail.execute.mockReturnValueOnce(Promise.resolve(makeFakeAccount()))
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(badRequest(new EmailInUseError()))
  })

  it('should call createRestaurant with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeCreateRestaurant.execute)
      .toHaveBeenCalledWith(fakeRequest.restaurantInput)
  })

  it('should return 200 on success', async () => {
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(ok({ accessToken: 'any_access_token', id: 'any_id' }))
  })

  it('should return 500 on error', async () => {
    fakeCreateAccount.execute.mockRejectedValueOnce(new Error())
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(serverError(new Error()))
  })
})