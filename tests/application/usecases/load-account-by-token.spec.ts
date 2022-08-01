import { MockProxy, mock } from 'jest-mock-extended'

import { LoadAccountByToken } from '@/application/usecases'
import {
  ILoadAccountByToken,
  ILoadAccountByTokenRepository
} from '@/application/protocols'
import { Account } from '@/domain/entities'

const makeFakeLoadAccountInput = (): ILoadAccountByToken.Input => ({
  accessToken: 'any_access_token',
})

const makeFakeAccount = (): Account => ({
  id: 'any_id',
  email: 'any@email.com',
  password: 'any_password'
})

describe('LoadAccountByToken', () => {
  let sut: LoadAccountByToken

  let fakeLoadAccountByTokenRepository: MockProxy<ILoadAccountByTokenRepository>

  let fakeAccount: Account
  let fakeLoadAccountInput: ILoadAccountByToken.Input

  beforeAll(() => {
    fakeLoadAccountByTokenRepository = mock()
    fakeLoadAccountByTokenRepository.loadByToken.mockResolvedValue(null)
    fakeLoadAccountInput = makeFakeLoadAccountInput()
    fakeAccount = makeFakeAccount()
  })
  beforeEach(() => {
    sut = new LoadAccountByToken(
      fakeLoadAccountByTokenRepository
    )
  })

  it('should call loadAccountByTokenRepository with correct input', async () => {
    await sut.execute(fakeLoadAccountInput)
    expect(fakeLoadAccountByTokenRepository.loadByToken)
      .toHaveBeenCalledWith(fakeLoadAccountInput)
  })

  it('should throw if loadAccountByTokenRepository thorws', async () => {
    fakeLoadAccountByTokenRepository.loadByToken.mockRejectedValueOnce(new Error())
    const promise = sut.execute(fakeLoadAccountInput)
    await expect(promise).rejects.toThrow()
  })
})