import { MockProxy, mock } from 'jest-mock-extended'

import {
  ICreateAccount,
  ICreateRestaurant,
  ILoadAccountByEmail
} from '@/application/protocols'
import { SignupController } from '@/application/controllers'
import { Account } from '@/domain/entities'

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

  let fakeLoadAccountByEmail: MockProxy<ILoadAccountByEmail>
  let fakeCreateAccount: MockProxy<ICreateAccount>
  let fakeCreateRestaurant: MockProxy<ICreateRestaurant>

  let fakeRequest: SignupController.Request

  beforeAll(() => {
    fakeLoadAccountByEmail = mock()
    fakeLoadAccountByEmail.execute.mockResolvedValue(null)

    fakeCreateAccount = mock()
    fakeCreateAccount.execute.mockReturnValue(Promise.resolve({ accessToken: 'any_access_token' }))

    fakeCreateRestaurant = mock()

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new SignupController(
      fakeLoadAccountByEmail,
      fakeCreateAccount,
      fakeCreateRestaurant
    )
  })

  it('should call createAccount with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeCreateAccount.execute)
      .toHaveBeenCalledWith(fakeRequest.accountInput)
  })

  it('should return 400 if loadAccountByEmail returns null', async () => {
    fakeLoadAccountByEmail.execute.mockReturnValueOnce(Promise.resolve(makeFakeAccount()))
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual({
        statusCode: 400,
        body: 'O email inserido já está em uso'
      })
  })

  it('should call createRestaurant with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeCreateRestaurant.execute)
      .toHaveBeenCalledWith(fakeRequest.restaurantInput)
  })

  it('should return 200 on success', async () => {
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual({
        statusCode: 200,
        body: { accessToken: 'any_access_token' }
      })
  })

  it('should return 500 on error', async () => {
    fakeCreateAccount.execute.mockRejectedValueOnce(new Error())
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual({
        statusCode: 500,
        body: new Error()
      })
  })
})