import { MockProxy, mock } from 'jest-mock-extended'

import { LoadRestaurantById } from '@/application/usecases'
import {
  ILoadRestaurantById,
  ILoadRestaurantByIdRepository
} from '@/application/protocols'
import { Restaurant } from '@/domain/entities'

const makeFakeLoadRestaurantInput = (): ILoadRestaurantById.Input => ({
  id: 'any_id',
})

const makeFakeRestaurant = (): Restaurant => ({
  id: 'any_id',
  name: 'any_name',
  accountId: 'any_account_id'
})

describe('CreateRestaurant', () => {
  let sut: LoadRestaurantById

  let fakeLoadRestaurantByIdRepository: MockProxy<ILoadRestaurantByIdRepository>

  let fakeRestaurant: Restaurant
  let fakeLoadRestaurantInput: ILoadRestaurantById.Input

  beforeAll(() => {
    fakeLoadRestaurantByIdRepository = mock()
    fakeLoadRestaurantByIdRepository.loadById.mockResolvedValue(null)
    fakeLoadRestaurantInput = makeFakeLoadRestaurantInput()
    fakeRestaurant = makeFakeRestaurant()
  })
  beforeEach(() => {
    sut = new LoadRestaurantById(
      fakeLoadRestaurantByIdRepository
    )
  })

  it('should call loadRestaurantByIdRepository with correct input', async () => {
    await sut.execute(fakeLoadRestaurantInput)
    expect(fakeLoadRestaurantByIdRepository.loadById)
      .toHaveBeenCalledWith(fakeLoadRestaurantInput)
  })

  it('should throw if loadRestaurantByIdRepository thorws', async () => {
    fakeLoadRestaurantByIdRepository.loadById.mockRejectedValueOnce(new Error())
    const promise = sut.execute(fakeLoadRestaurantInput)
    await expect(promise).rejects.toThrow()
  })
})