import request from 'supertest'
import { Express } from 'express'

import { SignupController } from '@/application/controllers'
import { setupApp } from '@/main/config'
import { getFirestore } from 'firebase-admin/firestore'

import FS_KEY from '@/../fs-key.json'
import { initializeApp, cert } from 'firebase-admin/app'

describe('SignupRoutes', () => {
  let app: Express

  const clearAccountsDatabase = async () => {
    const db = getFirestore()
    const accountsCollection = db.collection('accounts')
    const accountQuerySnapshot = await accountsCollection.get()
    accountQuerySnapshot.forEach(doc => doc.ref.delete())

  }
  const clearRestaurantsDatabase = async () => {
    const db = getFirestore()
    const restaurantsCollection = db.collection('restaurants')
    const restaurantQuerySnapshot = await restaurantsCollection.get()
    restaurantQuerySnapshot.forEach(doc => doc.ref.delete())
  }

  beforeAll(() => {
    initializeApp({
      credential: cert(FS_KEY as any),
    }, 'test');
  })

  beforeEach(async () => {
    app = setupApp()
    await clearAccountsDatabase()
    await clearRestaurantsDatabase()
  })

  describe('POST /signup', () => {
    it('should return 200 on success', async () => {
      const params: SignupController.Request = {
        accountInput: {
          email: 'any@mail.com',
          password: 'any_password'
        },
        restaurantInput: {
          name: 'any_name'
        }
      }
      const { status, body } = await request(app).post('/api/signup').send(params)
      expect(status).toBe(200)
      expect(body.accessToken).toBeTruthy()
    })
  })
})