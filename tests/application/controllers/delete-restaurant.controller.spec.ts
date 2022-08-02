import { MockProxy, mock } from 'jest-mock-extended'

import { IDeleteRestaurant, ILoadRestaurantById } from '@/application/protocols'
import { DeleteRestaurantController } from '@/application/controllers'
import { noContent, serverError, forbidden } from '@/application/helpers'
import { RestaurantDoesntBelongsToAccountError } from '@/application/errors'
import { Restaurant } from '@/domain/entities'

const makeFakeRequest = (): DeleteRestaurantController.Request => ({
  restaurantId: 'any_id',
  accountId: 'any_account_id',
})

const makeFakeRestaurant = (): Restaurant => ({
  id: 'any_id',
  name: 'any_name',
  accountId: 'any_account_id'
})

describe('DeleteRestaurantController', () => {
  let sut: DeleteRestaurantController

  let fakeLoadRestaurantById: MockProxy<ILoadRestaurantById>
  let fakeDeleteRestaurant: MockProxy<IDeleteRestaurant>

  let fakeRequest: DeleteRestaurantController.Request

  beforeAll(() => {
    fakeLoadRestaurantById = mock()
    fakeLoadRestaurantById.execute.mockResolvedValue(makeFakeRestaurant())
    fakeDeleteRestaurant = mock()

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new DeleteRestaurantController(fakeLoadRestaurantById, fakeDeleteRestaurant)
  })

  it('should call deleteRestaurant with correct input', async () => {
    await sut.handle(fakeRequest)
    const { restaurantId: id } = fakeRequest
    expect(fakeLoadRestaurantById.execute).toHaveBeenCalledWith({ id })
  })

  it('should return 403 if logged accountId isnt equal to restaurant accountId', async () => {
    fakeLoadRestaurantById.execute
      .mockReturnValueOnce(Promise.resolve({ ...makeFakeRestaurant(), accountId: 'other_account_id' }))
    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(forbidden(new RestaurantDoesntBelongsToAccountError()))
  })

  it('should call deleteRestaurant with correct input', async () => {
    await sut.handle(fakeRequest)
    const { restaurantId } = fakeRequest
    expect(fakeDeleteRestaurant.execute).toHaveBeenCalledWith({ restaurantId })
  })


  it('should return 200 on success', async () => {
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(noContent())
  })

  it('should return 500 on error', async () => {
    fakeDeleteRestaurant.execute.mockRejectedValueOnce(new Error())
    const response = await sut.handle(fakeRequest)
    expect(response)
      .toEqual(serverError(new Error()))
  })
})