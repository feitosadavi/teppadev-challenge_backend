import { MockProxy, mock } from 'jest-mock-extended'

import { Account } from '@/domain/entities'
import {
  IValidator,
  IUpdateAccount,
} from '@/application/protocols'
import { UpdateAccountController } from '@/application/controllers'
import { badRequest, noContent, serverError } from '@/application/controllers/helpers'

const makeFakeRequest = (): UpdateAccountController.Request => ({
  accountId: 'any_id',
  data: {
    email: 'any_email'
  }
})

describe('UpdateAccountController', () => {
  let sut: UpdateAccountController

  let fakeValidator: MockProxy<IValidator>
  let fakeUpdateAccount: MockProxy<IUpdateAccount>

  let fakeRequest: UpdateAccountController.Request

  beforeAll(() => {
    fakeValidator = mock()

    fakeUpdateAccount = mock()

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new UpdateAccountController(
      fakeValidator,
      fakeUpdateAccount,
    )
  })

  it('should call validator with correct input', async () => {
    await sut.handle(fakeRequest)
    const { accountId, ...fieldsToUpdate } = fakeRequest
    expect(fakeValidator.validate)
      .toHaveBeenCalledWith(fieldsToUpdate)
  })

  it('should return 400 if validator returns an error', async () => {
    fakeValidator.validate.mockReturnValueOnce(new Error('validation error'))
    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new Error('validation error')))
  })

  it('should call updateAccount with correct input', async () => {
    await sut.handle(fakeRequest)
    console.log(fakeRequest)
    expect(fakeUpdateAccount.execute).toHaveBeenCalledWith(fakeRequest)
  })

  it('should return 200 on success', async () => {
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(noContent())
  })

  it('should return 500 on error', async () => {
    fakeUpdateAccount.execute.mockRejectedValueOnce(new Error())
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(serverError(new Error()))
  })
})