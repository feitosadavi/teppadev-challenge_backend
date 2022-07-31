import { MockProxy, mock } from 'jest-mock-extended'

import { Authenticator } from '@/application/usecases'
import {
  IAuthenticator,
  IHashComparer,
  TokenGenerator,
  IUpdateAccountRepository
} from '@/application/protocols'

const makeFakeAuthenticatorInput = (): IAuthenticator.Input => ({
  password: 'any_password',
  accountPassword: 'hashed_password',
  accountId: 'any_id'
})

describe('Authenticator', () => {
  let sut: Authenticator

  let fakeHashComparer: MockProxy<IHashComparer>
  let fakeTokenGenerator: MockProxy<TokenGenerator>
  let fakeUpdateAccountRepository: MockProxy<IUpdateAccountRepository>

  let fakeAuthenticatorInput: IAuthenticator.Input

  beforeAll(() => {
    fakeHashComparer = mock()
    fakeHashComparer.compare.mockResolvedValue(true)

    fakeTokenGenerator = mock()
    fakeTokenGenerator.generate.mockResolvedValue('any_access_token')

    fakeUpdateAccountRepository = mock()

    fakeAuthenticatorInput = makeFakeAuthenticatorInput()
  })
  beforeEach(() => {
    sut = new Authenticator(
      fakeHashComparer,
      fakeTokenGenerator,
      fakeUpdateAccountRepository
    )
  })

  it('should call hashComparer with correct input', async () => {
    await sut.execute(fakeAuthenticatorInput)
    const { password, accountPassword } = fakeAuthenticatorInput

    expect(fakeHashComparer.compare)
      .toHaveBeenCalledWith({ hash: accountPassword, value: password })
  })

  it('should return null if hashComparer returns null', async () => {
    fakeHashComparer.compare.mockReturnValueOnce(null)
    const accessToken = await sut.execute(fakeAuthenticatorInput)

    expect(accessToken).toBeNull()
  })

  it('should call tokenGenerator with correct input', async () => {
    await sut.execute(fakeAuthenticatorInput)
    const { accountId } = fakeAuthenticatorInput

    expect(fakeTokenGenerator.generate)
      .toHaveBeenCalledWith({ key: accountId })
  })

  it('should call updateAccountRepository with correct input', async () => {
    await sut.execute(fakeAuthenticatorInput)
    const { accountId } = fakeAuthenticatorInput

    expect(fakeUpdateAccountRepository.update)
      .toHaveBeenCalledWith({ accountId, data: { accessToken: 'any_access_token' } })
  })

  it('should return an accessToken on success', async () => {
    const accessToken = await sut.execute(fakeAuthenticatorInput)

    expect(accessToken).toBe('any_access_token')
  })
})