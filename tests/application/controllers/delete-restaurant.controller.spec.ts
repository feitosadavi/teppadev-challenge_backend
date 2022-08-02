import { MockProxy, mock } from 'jest-mock-extended'

import { IDeleteRestaurant, ILoadRestaurantById } from '@/application/protocols'
import { DeleteRestaurantController } from '@/application/controllers'
import { noContent, serverError } from '@/application/helpers'

const makeFakeRequest = (): DeleteRestaurantController.Request => ({
  restaurantId: 'any_id',
  accountId: 'any_account_id',
})

describe('DeleteRestaurantController', () => {
  let sut: DeleteRestaurantController

  let fakeLoadRestaurantById: MockProxy<ILoadRestaurantById>
  let fakeDeleteRestaurant: MockProxy<IDeleteRestaurant>

  let fakeRequest: DeleteRestaurantController.Request

  beforeAll(() => {
    fakeLoadRestaurantById = mock()
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