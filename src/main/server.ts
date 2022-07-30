/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import moduleAlias from 'module-alias'
import 'module-alias/register'
import { resolve } from 'path'

const {
  NODE_ENV,
  PORT
} = process.env

// SETUP ALIASES FOR DEV AND PROD ENVIRONMENTS
const absolutePath = resolve('.')
const alias = NODE_ENV === 'production' ? { '@': `${absolutePath}/build` } : { '@': '/' }
moduleAlias.addAliases(alias)

import { setupApp } from './config/app'
import dotenv from 'dotenv-safe'

dotenv.config({ example: './.env.example' })
const app = setupApp()
app.listen(PORT, () => console.log(`Server runing at ${'http://localhost:' + PORT}`))
