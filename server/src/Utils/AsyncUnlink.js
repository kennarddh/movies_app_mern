import { unlink } from 'fs'

import { promisify } from 'util'

const AsyncUnlink = promisify(unlink)

export default AsyncUnlink
