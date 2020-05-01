import path from 'path'
import fs from 'fs'
import User from '../models/user'
import { getRepository } from 'typeorm'
import UploadConfig from '../config/upload'
import AppError from '../error/AppError'

interface Request {
  user_id: string
  avatarFilename: string
}

class UpdateAvatarUserServices {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Only Authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      // deletar um avatar
      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar)
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await usersRepository.save(user)

    return user
  }
}

export default UpdateAvatarUserServices
