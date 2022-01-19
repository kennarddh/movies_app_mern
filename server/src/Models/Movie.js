import mongoose, { Schema } from 'mongoose'

const Movie = new Schema(
	{
		name: { type: String, required: true },
		time: { type: [String], required: true },
		rating: { type: Number, required: true },
	},
	{ timestamps: true }
)

export default mongoose.model('movies', Movie)
