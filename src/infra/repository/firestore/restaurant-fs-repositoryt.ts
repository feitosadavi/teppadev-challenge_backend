import { ICreateRestaurantRepository, ILoadRestaurantByIdRepository, IUpdateRestaurantRepository } from '@/application/protocols';
import { Restaurant } from '@/domain/entities';
import { getFirestore } from 'firebase-admin/firestore'

export class RestaurantFsRepository implements ICreateRestaurantRepository, IUpdateRestaurantRepository, ILoadRestaurantByIdRepository {
  private readonly restaurantsCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor() {
    this.restaurantsCollection = getFirestore().collection('restaurants')
  }

  async create (input: ICreateRestaurantRepository.Input): Promise<ICreateRestaurantRepository.Output> {
    await this.restaurantsCollection.add(input)
  }

  async loadById ({ id }: ILoadRestaurantByIdRepository.Input): Promise<ILoadRestaurantByIdRepository.Output> {
    const data = (await this.restaurantsCollection.doc(id).get()).data()
    return data ? {
      id: id,
      ...data as Omit<Restaurant, 'id'>
    } : null
  }

  async update ({ restaurantId, data }: IUpdateRestaurantRepository.Input): Promise<IUpdateRestaurantRepository.Output> {
    await this.restaurantsCollection.doc(restaurantId).update(data)
  }
}