import { MockProxy, mock } from 'jest-mock-extended'

import {
  ISignup,
  ICreateAccount,
  ICreateRestaurant
} from '@/application/protocols'
import { SignupController } from '@/application/controllers'

const makeFakeRequest = (): ISignup.Input => ({
  accountInput: {
    email: 'any@email.com',
    password: 'any_password'
  },
  restaurantInput: {
    name: 'any_name',
  }
})

describe('SignupController', () => {
  let sut: SignupController
  let fakeCreateAccount: MockProxy<ICreateAccount>
  let fakeCreateRestaurant: MockProxy<ICreateRestaurant>
  let fakeRequest: ISignup.Input

  beforeAll(() => {
    fakeCreateAccount = mock()
    fakeCreateAccount.execute.mockReturnValue(Promise.resolve({ accessToken: 'any_access_token' }))
    fakeCreateRestaurant = mock()
    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new SignupController(fakeCreateAccount, fakeCreateRestaurant)
  })

  it('should call createAccount with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeCreateAccount.execute)
      .toHaveBeenCalledWith(fakeRequest.accountInput)
  })

  it('should return 400 if createAccount returns null', async () => {
    fakeCreateAccount.execute.mockReturnValueOnce(null)
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
})