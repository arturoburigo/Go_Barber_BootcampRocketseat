import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import UsersController from '../controllers/UsersController'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRoutes = Router()
const upload = multer(uploadConfig)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post('/', usersController.create)

usersRoutes.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRoutes
