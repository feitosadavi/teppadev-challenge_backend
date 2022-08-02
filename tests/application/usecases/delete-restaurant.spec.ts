import { MockProxy, mock } from 'jest-mock-extended'

import { DeleteRestaurant } from '@/application/usecases'
import {
  IDeleteRestaurant,
  IDeleteRestaurantRepository
} from '@/application/protocols'

const makeFakeDeleteRestaurantInput = (): IDeleteRestaurant.Input => ({
  restaurantId: 'any_id',
})

describe('DeleteRestaurant', () => {
  let sut: DeleteRestaurant

  let fakeDeleteRestaurantRepository: MockProxy<IDeleteRestaurantRepository>

  let fakeDeleteRestaurantInput: IDeleteRestaurant.Input

  beforeAll(() => {
    fakeDeleteRestaurantRepository = mock()

    fakeDeleteRestaurantInput = makeFakeDeleteRestaurantInput()
  })
  beforeEach(() => {
    sut = new DeleteRestaurant(fakeDeleteRestaurantRepository)
  })

  it('should call deleteRestaurantRepository with correct input', async () => {
    await sut.execute(fakeDeleteRestaurantInput)

    expect(fakeDeleteRestaurantRepository.delete)
      .toHaveBeenCalledWith(fakeDeleteRestaurantInput)
  })

  it('should rethrow if deleteRestaurantRepository throws', async () => {
    fakeDeleteRestaurantRepository.delete.mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.execute(fakeDeleteRestaurantInput)

    await expect(promise).rejects.toThrow()
  })
})