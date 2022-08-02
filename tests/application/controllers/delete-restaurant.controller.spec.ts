import { MockProxy, mock } from 'jest-mock-extended'

import { IDeleteRestaurant } from '@/application/protocols'
import { DeleteRestaurantController } from '@/application/controllers'
import { noContent, serverError } from '@/application/helpers'

const makeFakeRequest = (): DeleteRestaurantController.Request => ({
  restaurantId: 'any_id',
})

describe('DeleteRestaurantController', () => {
  let sut: DeleteRestaurantController

  let fakeDeleteRestaurant: MockProxy<IDeleteRestaurant>

  let fakeRequest: DeleteRestaurantController.Request

  beforeAll(() => {
    fakeDeleteRestaurant = mock()

    fakeRequest = makeFakeRequest()
  })
  beforeEach(() => {
    sut = new DeleteRestaurantController(fakeDeleteRestaurant)
  })

  it('should call deleteRestaurant with correct input', async () => {
    await sut.handle(fakeRequest)
    expect(fakeDeleteRestaurant.execute).toHaveBeenCalledWith(fakeRequest)
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