import dotenv from 'dotenv-safe'
dotenv.config({ example: './.env.example' })

const {
  NODE_ENV,
  PORT
} = process.env

import moduleAlias from 'module-alias'
import 'module-alias/register'
import { resolve } from 'path'

console.log(NODE_ENV)

// SETUP ALIASES FOR DEV AND PROD ENVIRONMENTS
const absolutePath = resolve('.')
const alias = NODE_ENV === 'production' ? { '@': `${absolutePath}/build` } : { '@': '/' }
moduleAlias.addAliases(alias)

import { setupApp } from './config/app'
const app = setupApp()
app.listen(3000, () => console.log(`Server runing at ${'http://localhost:' + PORT}`))

