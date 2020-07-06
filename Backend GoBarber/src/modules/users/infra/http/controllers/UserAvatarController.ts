import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'
import UpdateAvatarUserServices from '@modules/users/services/UpdateAvatarUserServices'

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const UpdateAvatarUsers = container.resolve(UpdateAvatarUserServices)

    const user = await UpdateAvatarUsers.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    return response.json(classToClass(user))
  }
}
