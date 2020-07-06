import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import multer from 'multer'
import uploadConfig from '@config/upload'
import UsersController from '../controllers/UsersController'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import UserAvatarController from '../controllers/UserAvatarController'

const usersRoutes = Router()
const upload = multer(uploadConfig)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
)

usersRoutes.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRoutes
