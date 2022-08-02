import request from 'supertest'
import { Express } from 'express'

import { setupApp } from '@/main/config'
import { getFirestore } from 'firebase-admin/firestore'

import FS_KEY from '@/main/config/fs-key'
import { initializeApp, cert } from 'firebase-admin/app'
import { sign } from 'jsonwebtoken'

describe('SignupRoutes', () => {
  let app: Express
  let db: FirebaseFirestore.Firestore



  const addAccount = async () => {
    const accountsColection = getFirestore().collection('accounts')
    return (await accountsColection.add({
      email: 'any@mail.com',
      password: 'any_password'
    })).id
  }

  const addRestaurant = async (accountId: string) => {
    const restaurantColection = getFirestore().collection('restaurants')
    return (await restaurantColection.add({
      name: 'any@mail.com',
      accountId
    })).id
  }

  const updateAccessToken = async (accountId: string, accessToken: string) => {
    const accountsColection = getFirestore().collection('accounts')
    await accountsColection.doc(accountId).update({ accessToken })
  }

  // beforeAll(() => {
  //   initializeApp({
  //     credential: cert(FS_KEY as any),
  //   }, `test-${Math.random()}`);
  //   db = getFirestore()
  // })

  beforeAll(async () => {
    initializeApp({
      credential: cert(FS_KEY as any),
    }, `test-${Math.random()}`);
    app = setupApp()
  })

  afterEach(async () => {
    const db = getFirestore()
    for (const collectionName of ['accounts', 'restaurants']) {
      const collection = db.collection(collectionName)
      const collectionSnapshot = await collection.get()
      collectionSnapshot.forEach(doc => doc.ref.delete())
    }
  })

  describe('PUT /restaurants/:id/update', () => {
    it('should return 200 on success', async () => {
      const accountId = await addAccount()
      const accessToken = sign(accountId, 'secret')
      updateAccessToken(accountId, accessToken)

      const restaurantId = await addRestaurant(accountId)

      const params = {
        data: {
          name: 'other_name',
        },
      }
      const { status, body } = await request(app)
        .put(`/api/restaurants/${restaurantId}/update`)
        .set('x-access-token', accessToken)
        .send(params)

      expect(status).toBe(204)
      expect(body).toEqual({})
    })
  })

  describe('DELETE /restaurants/:id/delete', () => {
    it('should return 200 on success', async () => {
      const accountId = await addAccount()
      const accessToken = sign(accountId, 'secret')
      updateAccessToken(accountId, accessToken)

      const restaurantId = await addRestaurant(accountId)

      const { status, body } = await request(app)
        .delete(`/api/restaurants/${restaurantId}/delete`)
        .set('x-access-token', accessToken)

      expect(status).toBe(204)
      expect(body).toEqual({})
    })
  })
})