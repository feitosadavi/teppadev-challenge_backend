import { ICreateAccountRepository } from '@/application/protocols';
import { getFirestore } from 'firebase-admin/firestore'

export class AccountFsRepository implements ICreateAccountRepository {
  private readonly accountsCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor() {
    this.accountsCollection = getFirestore().collection('accounts')
  }

  async create (input: ICreateAccountRepository.Input): Promise<string> {
    const id = (await this.accountsCollection.add(input)).id
    return id
  }
}