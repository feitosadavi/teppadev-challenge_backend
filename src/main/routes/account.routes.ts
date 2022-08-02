import { Router } from 'express'
import { adaptRoute, adaptMiddleware } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories'
import { makeUpdateAccountController, makeDeleteAccountController } from '@/main/factories'

export default (router: Router): void => {
  router.put('/accounts/update', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateAccountController()))
  router.delete('/accounts/delete', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteAccountController()))
}
