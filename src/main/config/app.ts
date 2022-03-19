import cors from 'cors'
import express from 'express'
import setupSwagger from './swagger'
import setupRoutes from './routes'
import { createServer } from 'http'
import { setupSocket } from './socket'

const app = express()
const httpServer = createServer(app)
app.use(express.json())
app.use(cors())
setupSwagger(app)
setupRoutes(app)
export const winSockServer = setupSocket(httpServer)
export default httpServer
