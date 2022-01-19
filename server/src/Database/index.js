import mongoose from 'mongoose'

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true }).catch(e => {
	console.error('Connection error', e.message)
})

const db = mongoose.connection

export default db
