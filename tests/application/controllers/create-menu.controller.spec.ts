import { MockProxy, mock } from 'jest-mock-extended'

import {
  IValidator,
  ICreateMenu,
} from '@/application/protocols'
import { CreateMenuController } from '@/application/controllers'
import { badRequest, noContent, serverError } from '@/application/helpers'
import { Restaurant } from '@/domain/entities'

const makeFakeRequest = (): CreateMenuController.Request => ({
  name: 'any_name',
  description: 'any_description',
  itens: [{
    name: 'any_item_name',
    description: 'any_description',
    photos: ['any_photo_link']
  }]
})

describe('CreateMenuController', () => {
  let sut: CreateMenuController

  let fakeValidator: MockProxy<IValidator>
  let fakeCreateMenu: MockProxy<ICreateMenu>

  let fakeRequest: CreateMenuController.Request

  beforeAll(() => {
    fakeValidator = mock()

    fakeCreateMenu = mock()

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new CreateMenuController(
      fakeValidator,
      fakeCreateMenu
    )
  })

  it('should call validator with correct input', async () => {
    await sut.handle(fakeRequest)
    expect(fakeValidator.validate)
      .toHaveBeenCalledWith(fakeRequest)
  })

  it('should return 400 if validator returns an error', async () => {
    fakeValidator.validate.mockReturnValueOnce(new Error('validation error'))
    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new Error('validation error')))
  })

  it('should call createMenu with correct input', async () => {
    await sut.handle(fakeRequest)
    expect(fakeCreateMenu.execute).toHaveBeenCalledWith(fakeRequest)
  })

  it('should return 200 on success', async () => {
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(noContent())
  })

  it('should return 500 on error', async () => {
    fakeCreateMenu.execute.mockRejectedValueOnce(new Error())
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(serverError(new Error()))
  })
})