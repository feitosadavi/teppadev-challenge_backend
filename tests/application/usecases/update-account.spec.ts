import { MockProxy, mock } from 'jest-mock-extended'

import { UpdateAccount } from '@/application/usecases'
import {
  IUpdateAccount,
  IUpdateAccountRepository
} from '@/application/protocols'

const makeFakeUpdateAccountInput = (): IUpdateAccount.Input => ({
  accountId: 'any_id',
  data: {
    email: 'any@email.com'
  }
})

describe('UpdateAccount', () => {
  let sut: UpdateAccount

  let fakeUpdateAccountRepository: MockProxy<IUpdateAccountRepository>

  let fakeUpdateAccountInput: IUpdateAccount.Input

  beforeAll(() => {
    fakeUpdateAccountRepository = mock()

    fakeUpdateAccountInput = makeFakeUpdateAccountInput()
  })
  beforeEach(() => {
    sut = new UpdateAccount(fakeUpdateAccountRepository)
  })

  it('should call updateAccountRepository with correct input', async () => {
    await sut.execute(fakeUpdateAccountInput)

    expect(fakeUpdateAccountRepository.update)
      .toHaveBeenCalledWith(fakeUpdateAccountInput)
  })

  it('should rethrow if updateAccountRepository throws', async () => {
    fakeUpdateAccountRepository.update.mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.execute(fakeUpdateAccountInput)

    await expect(promise).rejects.toThrow()
  })
})