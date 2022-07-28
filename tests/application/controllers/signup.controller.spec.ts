import { MockProxy, mock } from 'jest-mock-extended'

import {
  ISignup,
  ICreateAccount,
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
  let fakeRequest: ISignup.Input

  beforeAll(() => {
    fakeCreateAccount = mock()
    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new SignupController(fakeCreateAccount)
  })

  it('should call createAccount with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeCreateAccount.execute)
      .toHaveBeenCalledWith(fakeRequest.accountInput)
  })
})