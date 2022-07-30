
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { RestaurantFsRepository } from '@/infra/repository'
import FS_KEY from '@/../fs-key.json'


describe('RestaurantFsRepository', () => {
  let sut: RestaurantFsRepository
  let db: FirebaseFirestore.Firestore

  beforeAll(() => {
  })

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
      const restaurantsCollection = db.collection('restaurants')
      const querySnapshot = await restaurantsCollection.get()
      querySnapshot.forEach(doc => doc.ref.delete())
    })

    it('should add a restaurant', async () => {
      await sut.create({
        name: 'any_name'
      })
      const restaurant = await db.collection('restaurants').where('name', '==', 'any_name').get()
      expect(restaurant.docs[0].data()).toEqual({ name: 'any_name' })
    })
  })
})