import { MockProxy, mock } from 'jest-mock-extended'

import { LoadAccountByEmail } from '@/application/usecases'
import {
  ILoadAccountByEmail,
  ILoadAccountByEmailRepository
} from '@/application/protocols'
import { Account } from '@/domain/entities'

const makeFakeLoadAccountInput = (): ILoadAccountByEmail.Input => ({
  email: 'any@email.com',
})

const makeFakeAccount = (): Account => {
  const params = makeFakeLoadAccountInput()
  return { id: 'any_id', ...params, password: 'any_password' }
}

describe('CreateAccount', () => {
  let sut: LoadAccountByEmail

  let fakeLoadAccountByEmailRepository: MockProxy<ILoadAccountByEmailRepository>

  let fakeAccount: Account
  let fakeLoadAccountInput: ILoadAccountByEmail.Input

  beforeAll(() => {
    fakeLoadAccountByEmailRepository = mock()
    fakeLoadAccountByEmailRepository.loadByEmail.mockResolvedValue(null)
    fakeLoadAccountInput = makeFakeLoadAccountInput()
    fakeAccount = makeFakeAccount()
  })
  beforeEach(() => {
    sut = new LoadAccountByEmail(
      fakeLoadAccountByEmailRepository
    )
  })

  it('should call loadAccountByEmailRepository with correct input', async () => {
    await sut.execute(fakeLoadAccountInput)
    const { email } = fakeLoadAccountInput
    expect(fakeLoadAccountByEmailRepository.loadByEmail)
      .toHaveBeenCalledWith({ email })
  })

  it('should throw if loadAccountByEmailRepository thorws', async () => {
    fakeLoadAccountByEmailRepository.loadByEmail.mockRejectedValueOnce(new Error())
    const promise = sut.execute(fakeLoadAccountInput)
    await expect(promise).rejects.toThrow()
  })
})