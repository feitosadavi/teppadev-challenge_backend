import { MockProxy, mock } from 'jest-mock-extended'

import { CreateRestaurant } from '@/application/usecases'
import {
  ICreateRestaurant,
  ICreateRestaurantRepository,
} from '@/application/protocols'

const makefakeCreateRestaurantInput = (): ICreateRestaurant.Input => ({
  name: 'any_name',
  accountId: 'any_id'
})

describe('CreateRestaurant', () => {
  let sut: CreateRestaurant
  let fakeCreateRestaurantRepository: MockProxy<ICreateRestaurantRepository>
  let fakeCreateRestaurantInput: ICreateRestaurant.Input

  beforeAll(() => {
    fakeCreateRestaurantRepository = mock()
    fakeCreateRestaurantInput = makefakeCreateRestaurantInput()
  })
  beforeEach(() => {
    sut = new CreateRestaurant(fakeCreateRestaurantRepository)
  })

  it('should call createRestaurantRepository with correct input', async () => {
    await sut.execute(fakeCreateRestaurantInput)

    expect(fakeCreateRestaurantRepository.create)
      .toHaveBeenCalledWith(fakeCreateRestaurantInput)
  })
})