import { MockProxy, mock } from 'jest-mock-extended'

import { Signup } from '@/application/usecases'
import {
  ISignup,
  ICreateAccountRepository,
  ICreateRestaurantRepository
} from '@/application/protocols'

const makeFakeSignupInput = (): ISignup.Input => ({
  accountInput: {
    email: 'any@email.com',
    password: 'any_password'
  },
  restaurantInput: {
    name: 'any_name',
  }
})

describe('Signup', () => {
  let sut: Signup
  let fakeCreateAccountRepository: MockProxy<ICreateAccountRepository>
  let fakeCreateRestaurantRepository: MockProxy<ICreateRestaurantRepository>
  let fakeSignupInput: ISignup.Input

  beforeAll(() => {
    fakeCreateAccountRepository = mock()
    fakeCreateRestaurantRepository = mock()
    fakeSignupInput = makeFakeSignupInput()
  })
  beforeEach(() => {
    sut = new Signup(fakeCreateAccountRepository, fakeCreateRestaurantRepository)
  })

  it('should call createAccountRepository with correct input', async () => {
    await sut.execute(fakeSignupInput)

    expect(fakeCreateAccountRepository.create)
      .toHaveBeenCalledWith(fakeSignupInput.accountInput)
  })

  it('should call createAccountRepository with correct input', async () => {
    await sut.execute(fakeSignupInput)

    expect(fakeCreateRestaurantRepository.create)
      .toHaveBeenCalledWith(fakeSignupInput.restaurantInput)
  })
})