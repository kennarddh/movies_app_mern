import multer from 'multer'

import FileFilter from './FileFilter'
import Storage from './Storage'

const Upload = multer({
	storage: Storage,
	fileFilter: FileFilter,
})

export default Upload
