import 'dotenv/config'

import express from 'express'

// Middleware
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'

// Database
import db from './Database'

// Router
import MovieRouter from './Routes/Movie'
import AuthenticationRouter from './Routes/Authentication'
import NoMatchRouter from './Routes/NoMatch'

const app = express()
const PORT = process.env.PORT || 3000

// Static
app.use(express.static('public'))

// Middleware
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(compression())
app.use(helmet())
app.use(bodyParser.json(), urlencodedParser)
app.use(cors())

// Database
db.on('error', error => {
	console.log(`MongoDB connection error: ${error}`)
})

// Router
app.use('/api', MovieRouter)
app.use('/api', AuthenticationRouter)

app.use('*', NoMatchRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
