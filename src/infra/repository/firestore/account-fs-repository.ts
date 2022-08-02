import { ICreateAccountRepository, IDeleteAccountRepository, ILoadAccountByEmailRepository, ILoadAccountByTokenRepository, IUpdateAccountRepository } from '@/application/protocols';
import { Account } from '@/domain/entities';
import { getFirestore } from 'firebase-admin/firestore'

export class AccountFsRepository implements
  ICreateAccountRepository,
  ILoadAccountByEmailRepository,
  ILoadAccountByTokenRepository,
  IUpdateAccountRepository,
  IDeleteAccountRepository {

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

  async loadByToken ({ accessToken }: ILoadAccountByTokenRepository.Input): Promise<Account> {
    const docs = (await this.accountsCollection.where('accessToken', '==', accessToken).get()).docs[0]
    return docs ? {
      id: docs?.id,
      ...docs.data() as Omit<Account, 'id'>
    } : null
  }

  async update ({ accountId, data }: IUpdateAccountRepository.Input): Promise<IUpdateAccountRepository.Output> {
    await this.accountsCollection.doc(accountId).update(data)
  }

  async delete ({ accountId }: IDeleteAccountRepository.Input): Promise<void> {
    await this.accountsCollection.doc(accountId).delete()
  }
}