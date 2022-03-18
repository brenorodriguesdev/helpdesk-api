import app from './config/app'
import './config/database'
import * as dotenv from 'dotenv'

dotenv.config()
app.listen(process.env.PORT || 3500)
