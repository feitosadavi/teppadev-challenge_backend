import { ICreateAccountRepository, ILoadAccountByEmailRepository } from '@/application/protocols';
import { Account } from '@/domain/entities';
import { getFirestore } from 'firebase-admin/firestore'

export class AccountFsRepository implements ICreateAccountRepository, ILoadAccountByEmailRepository {
  private readonly accountsCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor() {
    this.accountsCollection = getFirestore().collection('accounts')
  }

  async create (input: ICreateAccountRepository.Input): Promise<string> {
    const id = (await this.accountsCollection.add(input)).id
    return id
  }

  async loadByEmail ({ email }: ILoadAccountByEmailRepository.Input): Promise<ILoadAccountByEmailRepository.Output> {
    const docs = (await this.accountsCollection.where('email', '==', email).get()).docs[0]
    return docs ? {
      id: docs?.id,
      ...docs.data() as Omit<Account, 'id'>
    } : null
  }
}