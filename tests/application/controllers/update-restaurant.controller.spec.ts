import { MockProxy, mock } from 'jest-mock-extended'

import {
  IValidator,
  IUpdateRestaurant,
  ILoadRestaurantById
} from '@/application/protocols'
import { UpdateRestaurantController } from '@/application/controllers'
import { badRequest, noContent, serverError, forbidden } from '@/application/controllers/helpers'
import { Restaurant } from '@/domain/entities'
import { RestaurantDoesntBelongsToAccountError } from '@/application/errors'

const makeFakeRequest = (): UpdateRestaurantController.Request => ({
  restaurantId: 'any_id',
  accountId: 'any_account_id',
  data: {
    name: 'other_name'
  }
})

const makeFakeRestaurant = (): Restaurant => ({
  id: 'any_id',
  name: 'any_name',
  accountId: 'any_account_id'
})

describe('UpdateRestaurantController', () => {
  let sut: UpdateRestaurantController

  let fakeValidator: MockProxy<IValidator>
  let fakeUpdateRestaurant: MockProxy<IUpdateRestaurant>
  let fakeLoadRestaurantById: MockProxy<ILoadRestaurantById>

  let fakeRequest: UpdateRestaurantController.Request

  beforeAll(() => {
    fakeValidator = mock()

    fakeLoadRestaurantById = mock()
    fakeLoadRestaurantById.execute.mockReturnValue(Promise.resolve(makeFakeRestaurant()))

    fakeUpdateRestaurant = mock()

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new UpdateRestaurantController(
      fakeValidator,
      fakeLoadRestaurantById,
      fakeUpdateRestaurant
    )
  })

  it('should call validator with correct input', async () => {
    await sut.handle(fakeRequest)
    const { restaurantId, accountId, ...data } = fakeRequest
    expect(fakeValidator.validate)
      .toHaveBeenCalledWith(data)
  })

  it('should return 400 if validator returns an error', async () => {
    fakeValidator.validate.mockReturnValueOnce(new Error('validation error'))
    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(badRequest(new Error('validation error')))
  })

  it('should call loadRestaurantById with correct input', async () => {
    await sut.handle(fakeRequest)
    const { restaurantId } = fakeRequest

    expect(fakeLoadRestaurantById.execute).toHaveBeenCalledWith({ id: restaurantId })
  })

  it('should return 403 if logged accountId isnt equal to restaurant accountId', async () => {
    fakeLoadRestaurantById.execute
      .mockReturnValueOnce(Promise.resolve({ ...makeFakeRestaurant(), accountId: 'other_account_id' }))
    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(forbidden(new RestaurantDoesntBelongsToAccountError()))
  })

  it('should call updateAccount with correct input', async () => {
    await sut.handle(fakeRequest)
    const { accountId, ...input } = fakeRequest
    expect(fakeUpdateRestaurant.execute).toHaveBeenCalledWith(input)
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