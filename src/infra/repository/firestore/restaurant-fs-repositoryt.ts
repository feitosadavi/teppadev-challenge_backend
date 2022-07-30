import { ICreateRestaurantRepository } from '@/application/protocols';
import { getFirestore } from 'firebase-admin/firestore'

export class RestaurantFsRepository implements ICreateRestaurantRepository {
  private readonly restaurantsCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor() {
    this.restaurantsCollection = getFirestore().collection('restaurants')
  }

  async create (input: ICreateRestaurantRepository.Input): Promise<ICreateRestaurantRepository.Output> {
    await this.restaurantsCollection.add(input)
  }
}