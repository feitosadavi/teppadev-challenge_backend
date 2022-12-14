import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { AccountFsRepository } from '@/infra/repository'
import FS_KEY from '@/main/config/fs-key'


jest.mock('jsonwebtoken')
describe('JWTAdapter', () => {
  let sut: AccountFsRepository
  let db: FirebaseFirestore.Firestore

  beforeAll(() => {
    initializeApp({
      credential: cert(FS_KEY as any)
    });
    sut = new AccountFsRepository()
    db = getFirestore();
  })

  describe('CreateAccountRepository', () => {
    beforeEach(async () => {
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

  describe('LoadAccountByEmailRepository', () => {
    beforeEach(async () => {
      const accountsCollection = db.collection('accounts')
      const querySnapshot = await accountsCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should return null if account was not found', async () => {
      const account = await sut.loadByEmail({ email: 'nonexistent@email.com' })
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

  describe('LoadAccountByEmailRepository', () => {
    beforeEach(async () => {
      const accountsCollection = db.collection('accounts')
      const querySnapshot = await accountsCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should return null if account was not found', async () => {
      const account = await sut.loadByToken({ accessToken: 'any_access_token' })
      expect(account).toBeNull()
    })
    it('should load a account by its email', async () => {
      let email = 'any@email.com'
      let password = 'hashed_password'
      const accessToken = 'any_access_token'

      await db.collection('accounts').add({ email, password, accessToken })

      const account = await sut.loadByToken({ accessToken })
      expect(account.id).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })

  describe('UpdateAccountRepository', () => {
    beforeEach(async () => {
      const accountsCollection = db.collection('accounts')
      const querySnapshot = await accountsCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should update account on success', async () => {
      let email = 'any@email.com'
      let password = 'hashed_password'
      const accountId = (await db.collection('accounts').add({ email, password })).id
      await sut.update({ data: { email: 'other@email.com' }, accountId })
      const updatedAccount = (await db.collection('accounts').doc(accountId).get()).data()
      expect(updatedAccount.email).toBe('other@email.com')
    })

    it('should create a new field on update success if it didnt exists', async () => {
      let email = 'any@email.com'
      let password = 'hashed_password'
      const accountId = (await db.collection('accounts').add({ email, password })).id
      await sut.update({ data: { accessToken: 'any_access_token' }, accountId })
      const updatedAccount = (await db.collection('accounts').doc(accountId).get()).data()
      expect(updatedAccount.accessToken).toBe('any_access_token')
    })
  })

  describe('DeleteAccountRepository', () => {
    beforeEach(async () => {
      const accountsCollection = db.collection('accounts')
      const querySnapshot = await accountsCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should delete account on success', async () => {
      let email = 'any@email.com'
      let password = 'hashed_password'
      const accountId = (await db.collection('accounts').add({ email, password })).id
      await sut.delete({ accountId })
      const deletedAccountId = (await db.collection('accounts').doc(accountId).get()).data()
      expect(deletedAccountId).toBeUndefined()
    })
  })
})