import { MockProxy, mock } from 'jest-mock-extended'

import { CreateAccount } from '@/application/usecases'
import {
  ICreateAccount,
  ICreateAccountRepository,
  ILoadAccountByEmailRepository,
  Hasher
} from '@/application/protocols'
import { Account } from '@/domain/entities'

const makeFakeCreateAccountInput = (): ICreateAccount.Input => ({
  email: 'any@email.com',
  password: 'any_password'
})

const makeFakeAccount = (): Account => {
  const params = makeFakeCreateAccountInput()
  return { id: 'any_id', ...params }
}

describe('CreateAccount', () => {
  let sut: CreateAccount

  let fakeLoadAccountByEmailRepository: MockProxy<ILoadAccountByEmailRepository>
  let fakeHasher: MockProxy<Hasher>
  let fakeCreateAccountRepository: MockProxy<ICreateAccountRepository>

  let fakeCreateAccountInput: ICreateAccount.Input
  let fakeAccount: Account

  beforeAll(() => {
    fakeLoadAccountByEmailRepository = mock()
    fakeLoadAccountByEmailRepository.loadByEmail.mockResolvedValue(null)
    fakeCreateAccountRepository = mock()
    fakeHasher = mock()
    fakeHasher.hash.mockResolvedValue('hashed_password')

    fakeCreateAccountInput = makeFakeCreateAccountInput()
    fakeAccount = makeFakeAccount()
  })
  beforeEach(() => {
    sut = new CreateAccount(
      fakeLoadAccountByEmailRepository,
      fakeHasher,
      fakeCreateAccountRepository
    )
  })

  it('should call loadAccountByEmailRepository with correct input', async () => {
    await sut.execute(fakeCreateAccountInput)
    const { email } = fakeCreateAccountInput
    expect(fakeLoadAccountByEmailRepository.loadByEmail)
      .toHaveBeenCalledWith({ email })
  })

  it('should return null if loadAccountByEmailRepository returns an account', async () => {
    fakeLoadAccountByEmailRepository.loadByEmail.mockResolvedValueOnce(fakeAccount)
    const account = await sut.execute(fakeCreateAccountInput)
    expect(account).toBeNull()
  })

  it('should call createAccountRepository with correct input', async () => {
    await sut.execute(fakeCreateAccountInput)

    expect(fakeCreateAccountRepository.create)
      .toHaveBeenCalledWith(fakeCreateAccountInput)
  })

  it('should call hasher with correct input', async () => {
    await sut.execute(fakeCreateAccountInput)
    expect(fakeHasher.hash)
      .toHaveBeenCalledWith(fakeAccount.password)
  })
})