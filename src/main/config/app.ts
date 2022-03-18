import cors from 'cors'
import express from 'express'
import setupSwagger from './swagger'
import setupRoutes from './routes'

const app = express()

app.use(express.json())
app.use(cors())
setupSwagger(app)
setupRoutes(app)

export default app
