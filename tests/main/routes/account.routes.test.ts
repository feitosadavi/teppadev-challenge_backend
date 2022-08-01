import request from 'supertest'
import { Express } from 'express'

import { UpdateAccountController } from '@/application/controllers'
import { setupApp } from '@/main/config'
import { getFirestore } from 'firebase-admin/firestore'

import FS_KEY from '@/main/config/fs-key'
import { initializeApp, cert } from 'firebase-admin/app'
import { sign } from 'jsonwebtoken'


describe('SignupRoutes', () => {
  let app: Express

  const clearAccountsDatabase = async () => {
    const db = getFirestore()
    const accountsCollection = db.collection('accounts')
    const accountQuerySnapshot = await accountsCollection.get()
    accountQuerySnapshot.forEach(doc => doc.ref.delete())

  }

  const addAccount = async () => {
    const accountsColection = getFirestore().collection('accounts')
    return (await accountsColection.add({
      email: 'any@mail.com',
      password: 'any_password'
    })).id
  }

  const updateAccessToken = async (accountId: string, accessToken: string) => {
    const accountsColection = getFirestore().collection('accounts')
    await accountsColection.doc(accountId).update({ accessToken })
  }

  beforeAll(() => {
    initializeApp({
      credential: cert(FS_KEY as any),
    }, `test-${Math.random()}`);
  })

  beforeEach(async () => {
    initializeApp({
      credential: cert(FS_KEY as any),
    }, `test-${Math.random()}`);
    app = setupApp()
    await clearAccountsDatabase()
  })

  describe('PUT /accounts/update', () => {
    it('should return 200 on success', async () => {
      const accountId = await addAccount()
      const accessToken = sign(accountId, 'secret')
      updateAccessToken(accountId, accessToken)

      const params = {
        data: {
          email: 'any@mail.com',
        },
      }
      const { status, body } = await request(app)
        .put('/api/accounts/update')
        .set('x-access-token', accessToken)
        .send(params)

      expect(status).toBe(204)
      expect(body).toEqual({})
    })
  })
})