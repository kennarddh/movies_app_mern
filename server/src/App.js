import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import db from './Database'
import MovieRouter from './Routes/Movie'
import AuthenticationRouter from './Routes/Authentication'
import NoMatchRouter from './Routes/NoMatch'

const app = express()
const Port = process.env.PORT || 3000

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json(), urlencodedParser)

app.use(cors())

app.use(bodyParser.json())

db.on('error', error => {
	console.log(`MongoDB connection error: ${error}`)
})

app.use('/api', MovieRouter)
app.use('/api', AuthenticationRouter)

app.use('*', NoMatchRouter)

app.listen(Port, () => console.log(`Server running on port ${Port}`))
