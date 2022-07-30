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
  })

  beforeEach(() => {
    sut = new AccountFsRepository()
  })

  describe('CreateAccountRepository', () => {
    beforeAll(() => {

      initializeApp({
        credential: cert(FS_KEY as any)
      });

      db = getFirestore();

    })

    afterEach(async () => {
      // Clear database
      const accountsCollection = db.collection('accounts')
      const querySnapshot = await accountsCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should add a account and return its id', async () => {
      const id = await sut.create({
        email: 'any@email.com',
        password: 'any_password'
      })
      expect(id).toBeTruthy()
    })
  })
})