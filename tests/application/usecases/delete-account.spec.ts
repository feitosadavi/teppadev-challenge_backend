import { MockProxy, mock } from 'jest-mock-extended'

import { DeleteAccount } from '@/application/usecases'
import {
  IDeleteAccount,
  IDeleteAccountRepository
} from '@/application/protocols'

const makeFakeDeleteAccountInput = (): IDeleteAccount.Input => ({
  accountId: 'any_id',
})

describe('DeleteAccount', () => {
  let sut: DeleteAccount

  let fakeDeleteAccountRepository: MockProxy<IDeleteAccountRepository>

  let fakeDeleteAccountInput: IDeleteAccount.Input

  beforeAll(() => {
    fakeDeleteAccountRepository = mock()

    fakeDeleteAccountInput = makeFakeDeleteAccountInput()
  })
  beforeEach(() => {
    sut = new DeleteAccount(fakeDeleteAccountRepository)
  })

  it('should call deleteAccountRepository with correct input', async () => {
    await sut.execute(fakeDeleteAccountInput)

    expect(fakeDeleteAccountRepository.delete)
      .toHaveBeenCalledWith(fakeDeleteAccountInput)
  })

  it('should rethrow if deleteAccountRepository throws', async () => {
    fakeDeleteAccountRepository.delete.mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.execute(fakeDeleteAccountInput)

    await expect(promise).rejects.toThrow()
  })
})