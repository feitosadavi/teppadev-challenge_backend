import { JWTAdapter } from '@/infra/cryptography'

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { AccountFsRepository } from '@/infra/repository'
import FS_KEY from '@/../fs-key.json'


jest.mock('jsonwebtoken')
describe('JWTAdapter', () => {
  let sut: AccountFsRepository
  let db: FirebaseFirestore.Firestore

  beforeAll(() => {
    initializeApp({
      credential: cert(FS_KEY as any)
    });

    db = getFirestore();
  })

  beforeEach(() => {
    sut = new AccountFsRepository()
  })

  afterEach(async () => {
    // Clear database
    const accountsCollection = db.collection('accounts')
    const querySnapshot = await accountsCollection.get()
    querySnapshot.forEach(doc => doc.ref.delete())
  })

  describe('CreateAccountRepository', () => {
    it('should add a account and return its id', async () => {
      const id = await sut.create({
        email: 'any@email.com',
        password: 'any_password'
      })
      expect(id).toBeTruthy()
    })
  })

  describe('LoadAccountByEmailRepository', () => {
    it('should return null if db has not saved accounts', async () => {
      const account = await sut.loadByEmail({ email: 'any@email.com' })
      expect(account).toBeNull()
    })
    it('should load a account by its email', async () => {
      let email = 'any@email.com'
      let password = 'hashed_password'

      await db.collection('accounts').add({ email, password })

      const account = await sut.loadByEmail({ email: 'any@email.com' })
      expect(account.id).toBeTruthy()
      expect(account.email).toBe('any@email.com')
    })
  })
})