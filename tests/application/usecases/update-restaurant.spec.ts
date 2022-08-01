import { MockProxy, mock } from 'jest-mock-extended'

import { UpdateRestaurant } from '@/application/usecases'
import {
  IUpdateRestaurant,
  IUpdateRestaurantRepository
} from '@/application/protocols'

const makeFakeUpdateRestaurantInput = (): IUpdateRestaurant.Input => ({
  accountId: 'any_id',
  data: {
    name: 'other_name'
  }
})

describe('UpdateRestaurant', () => {
  let sut: UpdateRestaurant

  let fakeUpdateRestaurantRepository: MockProxy<IUpdateRestaurantRepository>

  let fakeUpdateRestaurantInput: IUpdateRestaurant.Input

  beforeAll(() => {
    fakeUpdateRestaurantRepository = mock()

    fakeUpdateRestaurantInput = makeFakeUpdateRestaurantInput()
  })
  beforeEach(() => {
    sut = new UpdateRestaurant(fakeUpdateRestaurantRepository)
  })

  it('should call updateRestaurantRepository with correct input', async () => {
    await sut.execute(fakeUpdateRestaurantInput)

    expect(fakeUpdateRestaurantRepository.update)
      .toHaveBeenCalledWith(fakeUpdateRestaurantInput)
  })

  it('should rethrow if updateRestaurantRepository throws', async () => {
    fakeUpdateRestaurantRepository.update.mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.execute(fakeUpdateRestaurantInput)

    await expect(promise).rejects.toThrow()
  })
})