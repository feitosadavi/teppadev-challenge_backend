import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeSignupController } from '@/main/factories'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
