import request from 'supertest'
import { Express } from 'express'

import { LoginController } from '@/application/controllers'
import { setupApp } from '@/main/config'
import { getFirestore } from 'firebase-admin/firestore'

import FS_KEY from '@/../fs-key'
import { initializeApp, cert } from 'firebase-admin/app'
import { hash } from 'bcrypt'


describe('LoginRoutes', () => {
  let app: Express

  const clearAccountsDatabase = async () => {
    const db = getFirestore()
    const accountsCollection = db.collection('accounts')
    const accountQuerySnapshot = await accountsCollection.get()
    accountQuerySnapshot.forEach(doc => doc.ref.delete())
  }

  beforeEach(async () => {
    initializeApp({
      credential: cert(FS_KEY as any),
    }, `test-${Math.random()}`);
    app = setupApp()
    await clearAccountsDatabase()
  })

  describe('POST /signup', () => {
    it('should return 200 on success', async () => {
      const accountsColection = getFirestore().collection('accounts')

      const password = await hash('123', 12)
      await accountsColection.add({
        email: 'any@mail.com',
        password
      })

      const params: LoginController.Request = {
        email: 'any@mail.com',
        password: '123'
      }
      const { status, body } = await request(app).post('/api/login').send(params)
      expect(status).toBe(200)
      expect(body.accessToken).toBeTruthy()
    })
  })
})