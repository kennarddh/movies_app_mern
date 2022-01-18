import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import db from './db'
import MovieRouter from './routes/MovieRouter'

const app = express()
const Port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(bodyParser.json())

db.on('error', error => {
	console.log(`MongoDB connection error: ${error}`)
})

app.use('/api', MovieRouter)

app.get('*', (req, res) => {
	return res.status(404).json({ success: false, error: 'Not found' })
})

app.listen(Port, () => console.log(`Server running on port ${Port}`))
