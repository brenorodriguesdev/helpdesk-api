import cors from 'cors'
import express from 'express'
import setupRoutes from './routes'

const app = express()

app.use(express.json())
app.use(cors())
setupRoutes(app)

export default app
