import path from 'path'
import multer from 'multer'
import crypyo from 'crypto'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypyo.randomBytes(10).toString('HEX')
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    },
  }),
}
