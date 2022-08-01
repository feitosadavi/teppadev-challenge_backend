import { ICreateRestaurantRepository, IUpdateRestaurantRepository } from '@/application/protocols';
import { getFirestore } from 'firebase-admin/firestore'

export class RestaurantFsRepository implements ICreateRestaurantRepository, IUpdateRestaurantRepository {
  private readonly restaurantsCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor() {
    this.restaurantsCollection = getFirestore().collection('restaurants')
  }

  async create (input: ICreateRestaurantRepository.Input): Promise<ICreateRestaurantRepository.Output> {
    await this.restaurantsCollection.add(input)
  }

  async update ({ restaurantId, data }: IUpdateRestaurantRepository.Input): Promise<IUpdateRestaurantRepository.Output> {
    await this.restaurantsCollection.doc(restaurantId).update(data)
  }
}