import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import db from './db/index.js'
import MovieRouter from './routes/MovieRouter.js'

const app = express()
const Port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', MovieRouter)

app.get('*', function (req, res) {
	return res.status(404).json({ success: false, error: 'Not found' })
})

app.listen(Port, () => console.log(`Server running on port ${Port}`))
