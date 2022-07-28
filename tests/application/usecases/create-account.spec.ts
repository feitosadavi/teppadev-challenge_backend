import { MockProxy, mock } from 'jest-mock-extended'

import { CreateAccount } from '@/application/usecases'
import {
  ICreateAccount,
  ICreateAccountRepository,
  ILoadAccountByEmailRepository
} from '@/application/protocols'

const makeFakeCreateAccountInput = (): ICreateAccount.Input => ({
  email: 'any@email.com',
  password: 'any_password'
})

describe('CreateAccount', () => {
  let sut: CreateAccount
  let fakeLoadAccountByEmailRepository: MockProxy<ILoadAccountByEmailRepository>
  let fakeCreateAccountRepository: MockProxy<ICreateAccountRepository>
  let fakeCreateAccountInput: ICreateAccount.Input

  beforeAll(() => {
    fakeLoadAccountByEmailRepository = mock()
    fakeCreateAccountRepository = mock()
    fakeCreateAccountInput = makeFakeCreateAccountInput()
  })
  beforeEach(() => {
    sut = new CreateAccount(
      fakeLoadAccountByEmailRepository,
      fakeCreateAccountRepository
    )
  })

  it('should call loadAccountByEmailRepository with correct input', async () => {
    await sut.execute(fakeCreateAccountInput)
    const { email } = fakeCreateAccountInput
    expect(fakeLoadAccountByEmailRepository.loadByEmail)
      .toHaveBeenCalledWith({ email })
  })

  it('should call createAccountRepository with correct input', async () => {
    await sut.execute(fakeCreateAccountInput)

    expect(fakeCreateAccountRepository.create)
      .toHaveBeenCalledWith(fakeCreateAccountInput)
  })
})