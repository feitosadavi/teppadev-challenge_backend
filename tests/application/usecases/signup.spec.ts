import { MockProxy, mock } from 'jest-mock-extended'

import { Signup } from '@/application/usecases'
import { ISignup, ICreateAccountRepository } from '@/application/protocols'

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
  let fakeSignupInput: ISignup.Input

  beforeAll(() => {
    fakeCreateAccountRepository = mock()
    fakeSignupInput = makeFakeSignupInput()
  })
  beforeEach(() => {
    sut = new Signup(fakeCreateAccountRepository)
  })

  it('should call createAccountRepository with correct input', async () => {
    await sut.execute(fakeSignupInput)

    expect(fakeCreateAccountRepository.create).toHaveBeenCalledWith({
      email: 'any@email.com',
      password: 'any_password'
    })
  })
})