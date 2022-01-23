import { diskStorage } from 'multer'

import { v4 as uuidV4 } from 'uuid'

import path from 'path'

const storage = diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/movies/image')
	},
	filename: (req, file, cb) => {
		cb(null, `${uuidV4()}${Date.now()}${path.extname(file.originalname)}`)
	},
})

export default storage
