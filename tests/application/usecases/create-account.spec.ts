import { MockProxy, mock } from 'jest-mock-extended'

import { CreateAccount } from '@/application/usecases'
import {
  ICreateAccount,
  ICreateAccountRepository,
  Hasher,
  TokenGenerator
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

  let fakeHasher: MockProxy<Hasher>
  let fakeCreateAccountRepository: MockProxy<ICreateAccountRepository>
  let fakeTokenGenerator: MockProxy<TokenGenerator>

  let fakeCreateAccountInput: ICreateAccount.Input
  let fakeAccount: Account

  beforeAll(() => {
    fakeCreateAccountRepository = mock()
    fakeCreateAccountRepository.create.mockResolvedValue('any_id')

    fakeHasher = mock()
    fakeHasher.hash.mockResolvedValue('hashed_password')

    fakeTokenGenerator = mock()
    fakeTokenGenerator.generate.mockResolvedValue('any_access_token')

    fakeCreateAccountInput = makeFakeCreateAccountInput()
    fakeAccount = makeFakeAccount()
  })
  beforeEach(() => {
    sut = new CreateAccount(
      fakeHasher,
      fakeCreateAccountRepository,
      fakeTokenGenerator
    )
  })

  it('should call hasher with correct input', async () => {
    await sut.execute(fakeCreateAccountInput)
    expect(fakeHasher.hash)
      .toHaveBeenCalledWith(fakeAccount.password)
  })

  it('should call createAccountRepository with correct input', async () => {
    await sut.execute(fakeCreateAccountInput)
    const { email } = fakeCreateAccountInput
    expect(fakeCreateAccountRepository.create)
      .toHaveBeenCalledWith({ email, password: 'hashed_password' })
  })

  it('should call tokenGenerator with correct input', async () => {
    await sut.execute(fakeCreateAccountInput)
    expect(fakeTokenGenerator.generate)
      .toHaveBeenCalledWith({ key: 'any_id' })
  })

  it('should return an accessToken on success', async () => {
    const account = await sut.execute(fakeCreateAccountInput)
    expect(account).toEqual({ accessToken: 'any_access_token' })
  })
})