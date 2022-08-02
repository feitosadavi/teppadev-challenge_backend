import { MockProxy, mock } from 'jest-mock-extended'

import { IDeleteAccount } from '@/application/protocols'
import { DeleteAccountController } from '@/application/controllers'
import { noContent, serverError } from '@/application/helpers'

const makeFakeRequest = (): DeleteAccountController.Request => ({
  accountId: 'any_id',
})

describe('DeleteAccountController', () => {
  let sut: DeleteAccountController

  let fakeDeleteAccount: MockProxy<IDeleteAccount>

  let fakeRequest: DeleteAccountController.Request

  beforeAll(() => {
    fakeDeleteAccount = mock()

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new DeleteAccountController(fakeDeleteAccount)
  })

  it('should call deleteAccount with correct input', async () => {
    await sut.handle(fakeRequest)
    expect(fakeDeleteAccount.execute).toHaveBeenCalledWith(fakeRequest)
  })

  it('should return 200 on success', async () => {
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(noContent())
  })

  it('should return 500 on error', async () => {
    fakeDeleteAccount.execute.mockRejectedValueOnce(new Error())
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(serverError(new Error()))
  })
})