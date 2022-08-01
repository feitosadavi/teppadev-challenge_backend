import { MockProxy, mock } from 'jest-mock-extended'

import { Account } from '@/domain/entities'
import {
  IValidator,
  IUpdateRestaurant,
} from '@/application/protocols'
import { UpdateRestaurantController } from '@/application/controllers'
import { badRequest, noContent, serverError } from '@/application/controllers/helpers'

const makeFakeRequest = (): UpdateRestaurantController.Request => ({
  restaurantId: 'any_id',
  data: {
    name: 'other_name'
  }
})

describe('UpdateRestaurantController', () => {
  let sut: UpdateRestaurantController

  let fakeValidator: MockProxy<IValidator>
  let fakeUpdateRestaurant: MockProxy<IUpdateRestaurant>

  let fakeRequest: UpdateRestaurantController.Request

  beforeAll(() => {
    fakeValidator = mock()

    fakeUpdateRestaurant = mock()

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new UpdateRestaurantController(
      fakeValidator,
      fakeUpdateRestaurant,
    )
  })

  it('should call validator with correct input', async () => {
    await sut.handle(fakeRequest)
    const { restaurantId, ...fieldsToUpdate } = fakeRequest
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
    expect(fakeUpdateRestaurant.execute).toHaveBeenCalledWith(fakeRequest)
  })

  it('should return 200 on success', async () => {
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(noContent())
  })

  it('should return 500 on error', async () => {
    fakeUpdateRestaurant.execute.mockRejectedValueOnce(new Error())
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(serverError(new Error()))
  })
})