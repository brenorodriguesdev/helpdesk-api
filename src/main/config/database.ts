import pgPromise from 'pg-promise'

const pgp = pgPromise({/* Initialization Options */ })

export const database = pgp({
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB),
  database: process.env.DB
})
