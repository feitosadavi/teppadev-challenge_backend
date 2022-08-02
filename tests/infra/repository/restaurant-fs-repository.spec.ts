
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { RestaurantFsRepository } from '@/infra/repository'
import FS_KEY from '@/main/config/fs-key'
import { ICreateRestaurantRepository } from '@/application/protocols'


describe('RestaurantFsRepository', () => {
  let sut: RestaurantFsRepository
  let db: FirebaseFirestore.Firestore

  beforeEach(() => {
    sut = new RestaurantFsRepository()
  })

  describe('CreateRestaurantRepository', () => {
    beforeAll(() => {

      initializeApp({
        credential: cert(FS_KEY as any)
      });

      db = getFirestore();

    })

    afterEach(async () => {
      // Clear database
      const restaurantCollection = db.collection('restaurants')
      const querySnapshot = await restaurantCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should add a restaurant', async () => {
      const input: ICreateRestaurantRepository.Input = {
        name: 'any_name',
        accountId: 'any_account_id'
      }
      await sut.create(input)
      const restaurant = await db.collection('restaurants').where('name', '==', 'any_name').get()
      expect(restaurant.docs[0].data()).toEqual(input)
    })
  })

  describe('LoadAccountByEmailRepository', () => {
    beforeEach(async () => {
      const restaurantCollection = db.collection('restaurants')
      const querySnapshot = await restaurantCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should return null if account was not found', async () => {
      const account = await sut.loadById({ id: 'nonexistentid' })
      expect(account).toBeNull()
    })
    it('should load a account by its email', async () => {
      let name = 'any_name'

      const restaurantId = (await db.collection('restaurants').add({ name })).id

      const account = await sut.loadById({ id: restaurantId })
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
    })
  })

  describe('UpdateAccountRepository', () => {
    afterEach(async () => {
      // Clear database
      const restaurantCollection = db.collection('restaurants')
      const querySnapshot = await restaurantCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should update account on success', async () => {
      let name = 'any_name'
      const restaurantId = (await db.collection('restaurants').add({ name })).id
      await sut.update({ data: { name: 'other_name' }, restaurantId })
      const updatedRestaurant = (await db.collection('restaurants').doc(restaurantId).get()).data()
      expect(updatedRestaurant.name).toBe('other_name')
    })
  })

  describe('DeleteRestaurantRepository', () => {
    beforeEach(async () => {
      const restaurantCollection = db.collection('restaurants')
      const querySnapshot = await restaurantCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should delete restaurant on success', async () => {
      const restaurantId = (await db.collection('restaurants').add({ name: 'any_name' })).id

      await sut.delete({ restaurantId })

      const deletedRestaurantId = (await db.collection('restaurants').doc(restaurantId).get()).data()
      expect(deletedRestaurantId).toBeUndefined()
    })
  })
})