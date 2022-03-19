import httpServer from './config/app'
import './config/database'
import * as dotenv from 'dotenv'

dotenv.config()
httpServer.listen(process.env.PORT || 3500)
