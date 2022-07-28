import { MockProxy, mock } from 'jest-mock-extended'

import { CreateAccount } from '@/application/usecases'
import {
  ICreateAccount,
  ICreateAccountRepository,
} from '@/application/protocols'

const makefakeCreateAccountInput = (): ICreateAccount.Input => ({
  email: 'any@email.com',
  password: 'any_password'
})

describe('CreateAccount', () => {
  let sut: CreateAccount
  let fakeCreateAccountRepository: MockProxy<ICreateAccountRepository>
  let fakeCreateAccountInput: ICreateAccount.Input

  beforeAll(() => {
    fakeCreateAccountRepository = mock()
    fakeCreateAccountInput = makefakeCreateAccountInput()
  })
  beforeEach(() => {
    sut = new CreateAccount(fakeCreateAccountRepository)
  })

  it('should call createAccountRepository with correct input', async () => {
    await sut.execute(fakeCreateAccountInput)

    expect(fakeCreateAccountRepository.create)
      .toHaveBeenCalledWith(fakeCreateAccountInput)
  })
})