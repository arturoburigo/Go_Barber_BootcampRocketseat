import { Router } from 'express'

import multer from 'multer'

import uploadConfig from '../config/upload'

import ensureAuthentication from '../middlewares/ensureAuthentication'

import UpdateAvatarUserServices from '../services/UpdateAvatarUserServices'

import CreateUserServices from '../services/CreateUserServices'

const usersRoutes = Router()

const upload = multer(uploadConfig)

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body
    const createUser = new CreateUserServices()

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    delete user.password

    return response.json(user)
  } catch (err) {
    return response.status(400).json({ err: err.message })
  }
})

usersRoutes.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const UpdateAvatarUsers = new UpdateAvatarUserServices()

    const user = await UpdateAvatarUsers.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password

    return response.json(user)
  }
)

export default usersRoutes
