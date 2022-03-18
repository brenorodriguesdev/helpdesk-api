import pgPromise from 'pg-promise'
import * as dotenv from 'dotenv'

dotenv.config()
const pgp = pgPromise({/* Initialization Options */ })
export const database = pgp({
  user: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  database: String(process.env.DB)
})
