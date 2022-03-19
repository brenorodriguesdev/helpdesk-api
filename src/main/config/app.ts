import cors from 'cors'
import express from 'express'
import setupSwagger from './swagger'
import setupRoutes from './routes'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
app.use(express.json())
app.use(cors())
setupSwagger(app)
setupRoutes(app)

export default httpServer
