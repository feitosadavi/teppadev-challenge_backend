import { MockProxy, mock } from 'jest-mock-extended'

import { Account } from '@/domain/entities'
import {
  IValidator,
  ICreateAccount,
  ICreateRestaurant,
  ILoadAccountByEmail
} from '@/application/protocols'
import { SignupController } from '@/application/controllers'
import { EmailInUseError } from '@/application/errors'
import { badRequest, ok, serverError } from '@/application/helpers'

const makeFakeRequest = (): SignupController.Request => ({
  accountInput: {
    email: 'any@email.com',
    password: 'any_password'
  },
  restaurantInput: {
    name: 'any_name',
  }
})

const makeFakeAccount = (): Account => ({
  id: 'any_id',
  email: 'any_email',
  password: 'hashed_password'
})

const makeFakeCreateAccountResolvedValue = (): ICreateAccount.Output => ({
  accessToken: 'any_access_token',
  id: 'any_account_id'
})

describe('SignupController', () => {
  let sut: SignupController

  let fakeValidator: MockProxy<IValidator>
  let fakeLoadAccountByEmail: MockProxy<ILoadAccountByEmail>
  let fakeCreateAccount: MockProxy<ICreateAccount>
  let fakeCreateRestaurant: MockProxy<ICreateRestaurant>

  let fakeRequest: SignupController.Request
  let fakeCreateAccountResolvedValue: ICreateAccount.Output

  beforeAll(() => {
    fakeRequest = makeFakeRequest()
    fakeCreateAccountResolvedValue = makeFakeCreateAccountResolvedValue()

    fakeValidator = mock()

    fakeLoadAccountByEmail = mock()
    fakeLoadAccountByEmail.execute.mockResolvedValue(null)

    fakeCreateAccount = mock()
    fakeCreateAccount.execute.mockReturnValue(Promise.resolve(fakeCreateAccountResolvedValue))

    fakeCreateRestaurant = mock()

  })
  beforeEach(() => {
    sut = new SignupController(
      fakeValidator,
      fakeLoadAccountByEmail,
      fakeCreateAccount,
      fakeCreateRestaurant
    )
  })

  it('should call validator with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeValidator.validate)
      .toHaveBeenCalledWith(fakeRequest)
  })

  it('should call createAccount with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeCreateAccount.execute)
      .toHaveBeenCalledWith(fakeRequest.accountInput)
  })

  it('should return 400 if loadAccountByEmail returns null', async () => {
    fakeLoadAccountByEmail.execute.mockReturnValueOnce(Promise.resolve(makeFakeAccount()))
    const response = await sut.handle(fakeRequest)
    expect(response).toEqual(badRequest(new EmailInUseError()))
  })

  it('should call createRestaurant with correct input', async () => {
    await sut.handle(fakeRequest)

    expect(fakeCreateRestaurant.execute)
      .toHaveBeenCalledWith({ ...fakeRequest.restaurantInput, accountId: fakeCreateAccountResolvedValue.id })
  })

  it('should return 200 on success', async () => {
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(ok({ accessToken: 'any_access_token' }))
  })

  it('should return 500 on error', async () => {
    fakeCreateAccount.execute.mockRejectedValueOnce(new Error())
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(serverError(new Error()))
  })
})